"""Book Recommendation System Backend Package"""
import sys
import os

# Ensure backend directory is in sys.path for absolute 'app' imports regardless of working directory
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

__version__ = "1.0.0"
