from __future__ import annotations

import csv
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "sample_data"
sys.path.insert(0, str(ROOT))

from backend.app import TEMPLATE_FIELDS, demo_data  # noqa: E402


def main() -> None:
    OUT_DIR.mkdir(exist_ok=True)
    data = demo_data()

    for entity, rows in data.items():
        fields = TEMPLATE_FIELDS[entity]
        path = OUT_DIR / f"{entity}.csv"
        with path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
            writer.writeheader()
            writer.writerows(rows)

    readme = OUT_DIR / "README.txt"
    readme.write_text(
        "\n".join(
            [
                "Supply Chain Analytics sample dataset",
                "",
                "Upload these files from the dashboard's Manage data panel:",
                "- sales.csv -> Sales",
                "- inventory.csv -> Inventory",
                "- shipments.csv -> Shipments",
                "- purchase_orders.csv -> Purchase orders",
                "- products.csv -> Products",
                "- suppliers.csv -> Suppliers",
                "- warehouses.csv -> Warehouses",
                "",
                "Tip: start the app with `npm run dev:full`, open http://localhost:5173,",
                "create/login to an account, then upload each CSV to its matching data source.",
            ]
        ),
        encoding="utf-8",
    )

    print(f"Saved sample dataset to {OUT_DIR}")
    for entity, rows in data.items():
        print(f"{entity}: {len(rows)} rows")


if __name__ == "__main__":
    main()
