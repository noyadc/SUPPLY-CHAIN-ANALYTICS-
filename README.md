\# Supply Chain Analytics Platform



\## Overview



The Supply Chain Analytics Platform is an enterprise-grade analytics solution designed to help organizations monitor, optimize, and forecast supply chain operations through a centralized dashboard.



The platform integrates procurement, inventory, warehousing, logistics, supplier performance, and sales data to provide actionable insights that improve operational efficiency, reduce costs, and support strategic decision-making.



The system combines advanced analytics, forecasting models, inventory optimization techniques, and interactive dashboards to provide a complete view of supply chain performance.



\---



\## Features



\### Executive Dashboard



\* Total Revenue Analysis

\* Procurement Cost Monitoring

\* Inventory Cost Tracking

\* Gross Margin Analysis

\* Average Lead Time Monitoring

\* On-Time Delivery Rate

\* Fill Rate Analysis

\* Inventory Turnover Ratio

\* Supply Chain Health Score



\### Inventory Analytics



\* Inventory Turnover Analysis

\* ABC Classification

\* Inventory Aging Analysis

\* Overstock Detection

\* Understock Detection

\* Dead Stock Identification

\* Safety Stock Monitoring

\* Reorder Point Recommendations



\### Warehouse Analytics



\* Warehouse Utilization Tracking

\* Storage Occupancy Monitoring

\* Throughput Analysis

\* Capacity Utilization

\* Warehouse Efficiency Metrics

\* Bottleneck Detection



\### Supplier Performance Analytics



\* Supplier Reliability Scoring

\* Lead Time Analysis

\* Defect Rate Monitoring

\* Cost Comparison

\* Supplier Ranking

\* Risk Assessment



\### Logistics Analytics



\* Delivery Success Rate

\* Transportation Cost Analysis

\* Transit Time Monitoring

\* Shipment Delay Analysis

\* Route Performance Evaluation

\* Cost per Shipment Tracking



\### Procurement Analytics



\* Purchase Spend Analysis

\* Supplier Dependency Assessment

\* Cost Savings Opportunities

\* Category Spend Analysis

\* Supplier Concentration Risk



\### Demand Forecasting



\* Prophet Forecasting Model

\* XGBoost Forecasting Model

\* ARIMA Forecasting Model

\* 30-Day Forecasts

\* 90-Day Forecasts

\* 6-Month Forecasts

\* Seasonal Trend Detection

\* Demand Spike Prediction



\### Inventory Optimization Engine



\* Economic Order Quantity (EOQ)

\* Safety Stock Calculation

\* Reorder Point Calculation

\* Carrying Cost Estimation

\* Service Level Monitoring

\* Automated Inventory Recommendations



\### Risk Management



\* Supplier Risk Analysis

\* Inventory Risk Assessment

\* Transportation Risk Analysis

\* Demand Volatility Monitoring

\* Supply Chain Risk Scoring

\* Risk Heatmaps



\### Scenario Analysis



Simulate operational changes such as:



\* Supplier Lead Time Increase (+20%)

\* Demand Increase (+40%)

\* Fuel Cost Increase (+15%)

\* Warehouse Capacity Reduction (-10%)



Analyze impact on:



\* Revenue

\* Costs

\* Inventory Levels

\* Service Levels

\* Operational Performance



\---



\## Technology Stack



\### Frontend



\* React.js

\* Vite

\* JavaScript

\* CSS3



\### Backend



\* Python

\* Flask / FastAPI

\* Pandas

\* NumPy

\* Scikit-Learn



\### Forecasting \& Analytics



\* Prophet

\* XGBoost

\* ARIMA

\* Statistical Modeling



\### Database



\* SQLite

\* PostgreSQL

\* MySQL

\* SQL Server



\### Data Processing



\* ETL Pipelines

\* Data Validation

\* Data Cleaning

\* Data Transformation



\---



\## Database Schema



\### Fact Tables



\#### Fact\_Sales



\* SaleID

\* ProductID

\* CustomerID

\* WarehouseID

\* QuantitySold

\* Revenue

\* DateKey



\#### Fact\_Inventory



\* InventoryID

\* ProductID

\* WarehouseID

\* CurrentStock

\* SafetyStock

\* ReorderPoint

\* InventoryCost



\#### Fact\_Shipments



\* ShipmentID

\* SupplierID

\* WarehouseID

\* ShipmentDate

\* DeliveryDate

\* DelayDays

\* FreightCost



\#### Fact\_PurchaseOrders



\* POID

\* SupplierID

\* ProductID

\* QuantityOrdered

\* QuantityReceived

\* LeadTime



\### Dimension Tables



\#### Dim\_Product



\* Product Name

\* Category

\* Brand

\* SKU



\#### Dim\_Supplier



\* Supplier Name

\* Region

\* Contract Type



\#### Dim\_Warehouse



\* Warehouse Name

\* City

\* State

\* Capacity



\#### Dim\_Date



\* Day

\* Month

\* Quarter

\* Year



\---



\## Installation



\### Clone Repository



```bash

git clone https://github.com/noyadc/SUPPLY-CHAIN-ANALYTICS-.git

cd SUPPLY-CHAIN-ANALYTICS-

```



\### Frontend Setup



```bash

npm install

npm run dev

```



\### Backend Setup



```bash

cd backend



python -m venv venv



\# Windows

venv\\Scripts\\activate



pip install -r requirements.txt



python app.py

```



\---



\## Sample Data



The repository contains realistic sample datasets:



\* Products

\* Suppliers

\* Warehouses

\* Inventory

\* Purchase Orders

\* Sales Transactions

\* Shipments



These datasets allow users to explore all analytics modules immediately after deployment.



\---



\## Business Impact



This platform helps organizations:



\* Reduce inventory carrying costs

\* Improve supplier reliability

\* Optimize procurement spending

\* Reduce delivery delays

\* Improve warehouse utilization

\* Forecast future demand accurately

\* Mitigate supply chain risks

\* Improve operational decision-making



\---



\## Future Enhancements



\* AI Supply Chain Copilot

\* Natural Language Analytics

\* Real-Time ERP Integration

\* IoT Warehouse Monitoring

\* Route Optimization Engine

\* Digital Supply Chain Twin

\* Generative AI Executive Insights

\* Predictive Supplier Risk Modeling



\---



\## Author



Sinoya DCunha



Computer Engineering Student

St. Francis Institute of Technology (Mumbai University)



\---



\## License



This project is intended for educational, research, and portfolio purposes.



