import os
from typing import List
from dotenv import load_dotenv

# Search and load .env from backend/ or project root
candidate_env_paths = [
    os.path.join(os.path.dirname(__file__), '..', '.env'),
    os.path.join(os.path.dirname(__file__), '..', '..', '.env'),
    '.env'
]

for env_path in candidate_env_paths:
    if os.path.exists(env_path):
        load_dotenv(dotenv_path=env_path)
        break


class Settings:
    PROJECT_NAME: str = "Book Recommendation API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"

    # Supabase Credentials
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "").strip()
    SUPABASE_SECRET_KEY: str = (
        os.getenv("SUPABASE_SECRET_KEY") or
        os.getenv("SUPABASE_SERVICE_ROLE_KEY") or
        os.getenv("SUPABASE_KEY") or
        ""
    ).strip()

    # Server Settings
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))

    # CORS Origins
    _raw_cors = os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"
    )
    CORS_ORIGINS: List[str] = [origin.strip() for origin in _raw_cors.split(",") if origin.strip()]

    # ML Model Path Resolution
    @property
    def MODEL_DIR(self) -> str:
        candidates = [
            os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'model', 'models')),
            os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'models')),
            os.path.abspath('model/models'),
            os.path.abspath('../model/models')
        ]
        for c in candidates:
            if os.path.exists(c) and os.path.exists(os.path.join(c, 'books.pkl')):
                return c
        return candidates[0]


settings = Settings()
