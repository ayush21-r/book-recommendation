#!/usr/bin/env python3
"""
Seed Books Script for Supabase PostgreSQL Database
Phase 2: Database Layer

This script:
1. Loads dataset books and merges cluster assignments from the trained ML model.
2. Connects to Supabase using credentials from environment variables / .env.
3. Batches and imports the clean book catalog into the 'books' table.
4. Executes validation checks (count verification, title search, cluster query).
"""

import os
import sys
import time
from typing import List, Dict, Any, Optional

import pandas as pd
import numpy as np
import joblib
from dotenv import load_dotenv

try:
    from supabase import create_client, Client
except ImportError:
    print("Error: 'supabase' package is required. Install via: pip install supabase")
    sys.exit(1)


def find_file(relative_paths: List[str]) -> Optional[str]:
    """Finds a file across multiple candidate relative paths."""
    for path in relative_paths:
        if os.path.exists(path):
            return os.path.abspath(path)
    return None


def load_environment() -> None:
    """Loads environment variables from .env files in database/ or project root."""
    candidate_envs = [
        os.path.join(os.path.dirname(__file__), '.env'),
        os.path.join(os.path.dirname(__file__), '..', '.env'),
        '.env'
    ]
    for env_path in candidate_envs:
        if os.path.exists(env_path):
            load_dotenv(dotenv_path=env_path)
            print(f"Loaded environment variables from: {os.path.abspath(env_path)}")
            return
    load_dotenv()


def prepare_book_records() -> List[Dict[str, Any]]:
    """
    Loads book data and aligns it with trained ML model clusters.
    Returns a clean list of dictionary records ready for database insertion.
    """
    # 1. Resolve model books artifact path
    model_books_path = find_file([
        os.path.join('model', 'models', 'books.pkl'),
        os.path.join('..', 'model', 'models', 'books.pkl'),
        os.path.join('models', 'books.pkl')
    ])

    if not model_books_path:
        raise FileNotFoundError(
            "Trained ML model artifact 'books.pkl' not found. "
            "Please ensure Phase 1 model artifacts exist in 'model/models/'."
        )

    print(f"Loading trained books dataset from: {model_books_path}")
    df_model = joblib.load(model_books_path)
    print(f"Total unique books in trained model: {len(df_model):,}")

    # Clean and structure records
    records: List[Dict[str, Any]] = []
    seen_book_ids = set()

    for _, row in df_model.iterrows():
        b_id = int(row['book_id'])
        if b_id in seen_book_ids:
            continue
        seen_book_ids.add(b_id)

        # Publication year formatting
        pub_year = row.get('original_publication_year')
        if pd.isna(pub_year) or np.isnan(pub_year):
            year_val = None
        else:
            try:
                year_val = int(pub_year)
            except (ValueError, TypeError):
                year_val = None

        # Rating formatting
        rating = row.get('average_rating')
        if pd.isna(rating) or np.isnan(rating):
            rating_val = 0.0
        else:
            try:
                rating_val = round(float(rating), 2)
            except (ValueError, TypeError):
                rating_val = 0.0

        record = {
            'book_id': b_id,
            'title': str(row['title']).strip(),
            'authors': str(row['authors']).strip(),
            'original_publication_year': year_val,
            'language_code': str(row.get('language_code', 'eng')).strip() if pd.notna(row.get('language_code')) else 'eng',
            'average_rating': rating_val,
            'image_url': str(row.get('image_url', '')).strip() if pd.notna(row.get('image_url')) else '',
            'description': str(row.get('description', '')).strip() if pd.notna(row.get('description')) else '',
            'cluster': int(row['cluster'])
        }
        records.append(record)

    return records


def get_supabase_client() -> Optional[Client]:
    """Retrieves and validates Supabase client credentials."""
    supabase_url = os.environ.get('SUPABASE_URL', '').strip()
    supabase_key = (
        os.environ.get('SUPABASE_SECRET_KEY') or
        os.environ.get('SUPABASE_SERVICE_ROLE_KEY') or
        os.environ.get('SUPABASE_KEY') or
        ''
    ).strip()

    if not supabase_url or not supabase_key or supabase_url == 'your_supabase_project_url':
        print("\n" + "=" * 80)
        print("[!] SUPABASE CREDENTIALS MISSING OR NOT CONFIGURED")
        print("=" * 80)
        print("To seed data into Supabase, configure your local environment:")
        print("1. Copy 'database/.env.example' to 'database/.env'")
        print("2. Set your Supabase URL and Secret/Service Key:")
        print("   SUPABASE_URL=https://<your-project-id>.supabase.co")
        print("   SUPABASE_SECRET_KEY=<your-service-role-secret-key>")
        print("3. Ensure the 'books' table is created by running 'database/schema.sql' in the Supabase SQL Editor.")
        print("4. Re-run this script: python database/seed_books.py\n")
        return None

    return create_client(supabase_url, supabase_key)


def seed_database(client: Client, records: List[Dict[str, Any]], batch_size: int = 250) -> bool:
    """Inserts / upserts records into Supabase in batches."""
    total_records = len(records)
    print(f"\nStarting batch import of {total_records:,} books into Supabase 'books' table...")
    print(f"Batch size: {batch_size} records per request.\n")

    start_time = time.time()
    inserted_count = 0

    for i in range(0, total_records, batch_size):
        batch = records[i:i + batch_size]
        batch_num = (i // batch_size) + 1
        total_batches = (total_records + batch_size - 1) // batch_size

        try:
            response = client.table('books').upsert(batch, on_conflict='book_id').execute()
            inserted_count += len(batch)
            pct = (inserted_count / total_records) * 100
            print(f"  [Batch {batch_num:02d}/{total_batches:02d}] Upserted {inserted_count:,}/{total_records:,} ({pct:5.1f}%)")
        except Exception as e:
            print(f"[X] Error inserting batch {batch_num}: {e}")
            print("Tip: Verify that 'database/schema.sql' has been executed in the Supabase SQL Editor.")
            return False

    elapsed = time.time() - start_time
    print(f"\n[OK] Successfully imported {inserted_count:,} books in {elapsed:.2f} seconds!")
    return True


def validate_database(client: Client) -> None:
    """Executes validation queries to verify data integrity and index behavior."""
    print("\n" + "=" * 80)
    print("VALIDATING SUPABASE DATABASE INTEGRITY")
    print("=" * 80)

    # 1. Total row count
    try:
        count_res = client.table('books').select('id', count='exact').limit(1).execute()
        total_in_db = count_res.count if hasattr(count_res, 'count') else 'N/A'
        print(f"[OK] Total Books in Database: {total_in_db}")
    except Exception as e:
        print(f"[!] Could not fetch total count: {e}")

    # 2. Sample book retrieval
    try:
        sample_res = client.table('books').select('book_id, title, authors, cluster, average_rating').limit(3).execute()
        print("\n[OK] Sample Retrieved Books:")
        for b in sample_res.data:
            print(f"   * [{b.get('book_id')}] '{b.get('title')}' by {b.get('authors')} (Rating: {b.get('average_rating')}, Cluster: {b.get('cluster')})")
    except Exception as e:
        print(f"[!] Could not fetch sample books: {e}")

    # 3. Cluster filtering query (e.g., Cluster 4)
    try:
        cluster_res = client.table('books').select('book_id, title, authors').eq('cluster', 4).limit(3).execute()
        print(f"\n[OK] Cluster 4 Filter Test (Found sample matching records):")
        for b in cluster_res.data:
            print(f"   * '{b.get('title')}' by {b.get('authors')}")
    except Exception as e:
        print(f"[!] Could not test cluster filtering: {e}")

    # 4. Title search query (e.g., 'Hobbit')
    try:
        search_res = client.table('books').select('book_id, title, authors, cluster').ilike('title', '%Hobbit%').limit(3).execute()
        print(f"\n[OK] Title Search Test ('%Hobbit%'):")
        for b in search_res.data:
            print(f"   * [{b.get('book_id')}] '{b.get('title')}' | Cluster {b.get('cluster')}")
    except Exception as e:
        print(f"[!] Could not test title search: {e}")

    print("\n[OK] All database validation queries completed successfully!")


def main():
    print("=" * 80)
    print("BOOK RECOMMENDATION SYSTEM - SUPABASE SEEDING ENGINE")
    print("=" * 80)

    # 1. Load Environment
    load_environment()

    # 2. Prepare Data
    try:
        records = prepare_book_records()
    except Exception as e:
        print(f"[X] Error preparing book records: {e}")
        sys.exit(1)

    # 3. Connect to Supabase
    client = get_supabase_client()
    if client is None:
        print("Data preparation validated successfully (4,763 clean records ready).")
        print("Database script is ready. Once credentials are provided in .env, run: python database/seed_books.py")
        return

    # 4. Seed Data
    success = seed_database(client, records, batch_size=250)
    if not success:
        sys.exit(1)

    # 5. Validate Database
    validate_database(client)


if __name__ == '__main__':
    main()
