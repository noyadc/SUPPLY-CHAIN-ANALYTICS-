import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight,
  BarChart3, Bell, Boxes, Building2, CalendarDays, Check, ChevronDown,
  ChevronRight, CircleDollarSign, ClipboardList, Command, Container,
  Download, Factory, Filter, Gauge, HelpCircle, LayoutDashboard, Menu,
  Moon, PackageCheck, PanelLeftClose, RefreshCw, Search, Settings,
  ShieldCheck, ShoppingCart, Sparkles, Sun, Target, TrendingUp, Truck,
  Users, Warehouse, X, Zap, UploadCloud, Database, LogOut, FileSpreadsheet,
  LockKeyhole, Mail, UserRound, LoaderCircle
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart,
  Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip,
  XAxis, YAxis
} from "recharts";
import { api, API_URL } from "./api";

const C = {
  blue: "#3b82f6", cyan: "#22d3ee", green: "#35d399", amber: "#f5b942",
  red: "#fb7185", violet: "#9b8afb", slate: "#7f91aa"
};

const nav = [
  { id: "executive", label: "Executive overview", icon: LayoutDashboard },
  { id: "inventory", label: "Inventory", icon: Boxes, count: 12 },
  { id: "warehouse", label: "Warehouses", icon: Warehouse },
  { id: "suppliers", label: "Suppliers", icon: Building2, count: 3 },
  { id: "logistics", label: "Logistics", icon: Truck },
  { id: "forecast", label: "Demand forecast", icon: TrendingUp },
  { id: "procurement", label: "Procurement", icon: ClipboardList },
  { id: "scenarios", label: "Scenario studio", icon: Sparkles },
];

const revenueData = [
  { m: "Jul", revenue: 3.7, target: 3.45, margin: 30.2 },
  { m: "Aug", revenue: 3.9, target: 3.60, margin: 31.4 },
  { m: "Sep", revenue: 3.6, target: 3.72, margin: 29.8 },
  { m: "Oct", revenue: 4.1, target: 3.86, margin: 31.9 },
  { m: "Nov", revenue: 4.3, target: 4.02, margin: 32.6 },
  { m: "Dec", revenue: 4.8, target: 4.15, margin: 33.1 },
  { m: "Jan", revenue: 4.4, target: 4.24, margin: 32.2 },
  { m: "Feb", revenue: 4.6, target: 4.35, margin: 33.5 },
  { m: "Mar", revenue: 5.0, target: 4.48, margin: 34.1 },
  { m: "Apr", revenue: 4.7, target: 4.58, margin: 33.7 },
  { m: "May", revenue: 5.2, target: 4.72, margin: 34.8 },
  { m: "Jun", revenue: 5.4, target: 4.85, margin: 35.2 },
];

const healthData = [
  { name: "Supplier", value: 91, color: C.green },
  { name: "Inventory", value: 76, color: C.amber },
  { name: "Logistics", value: 84, color: C.blue },
  { name: "Demand", value: 88, color: C.violet },
];

const facilityData = [
  { name: "Chicago Central", code: "CHI-01", region: "Midwest", utilization: 92, throughput: "8.4k", status: "Capacity risk", change: 4.2 },
  { name: "Dallas Fulfillment", code: "DAL-02", region: "South", utilization: 81, throughput: "7.1k", status: "Healthy", change: 2.8 },
  { name: "Newark Gateway", code: "NWK-01", region: "Northeast", utilization: 74, throughput: "6.8k", status: "Healthy", change: 5.1 },
  { name: "Los Angeles West", code: "LAX-03", region: "West", utilization: 88, throughput: "7.6k", status: "Watch", change: -1.3 },
];

const alerts = [
  { level: "critical", title: "12 SKUs below safety stock", detail: "Chicago Central · Electronics", time: "12 min ago", icon: Boxes },
  { level: "warning", title: "Shipment delay risk increased", detail: "Shanghai → Los Angeles · Route AP-04", time: "38 min ago", icon: Truck },
  { level: "warning", title: "Warehouse approaching capacity", detail: "Chicago Central · 92% utilized", time: "2 hr ago", icon: Warehouse },
  { level: "info", title: "Demand spike forecast", detail: "Home appliances · +28% in 14 days", time: "4 hr ago", icon: TrendingUp },
];

const inventoryRows = [
  { sku: "EL-1048", product: "SmartHub Controller", category: "Electronics", stock: 118, safety: 160, value: 142800, age: 18, status: "Understock" },
  { sku: "HA-2201", product: "AirPure Filter XL", category: "Home appliance", stock: 842, safety: 310, value: 117880, age: 127, status: "Overstock" },
  { sku: "IN-8834", product: "Drive Belt Assembly", category: "Industrial", stock: 64, safety: 85, value: 36480, age: 42, status: "Understock" },
  { sku: "EL-1190", product: "Vision Sensor Pro", category: "Electronics", stock: 236, safety: 140, value: 212400, age: 33, status: "Healthy" },
  { sku: "PK-4412", product: "Reinforced Carton L", category: "Packaging", stock: 2860, safety: 1200, value: 57200, age: 16, status: "Healthy" },
];

const supplierRows = [
  { name: "Nexus Components", region: "Taiwan", delivery: 96, quality: 94, cost: 87, response: 92, spend: "$2.84M", score: 93 },
  { name: "Apex Materials", region: "Germany", delivery: 91, quality: 97, cost: 82, response: 88, spend: "$2.31M", score: 91 },
  { name: "Pacific Forge", region: "China", delivery: 78, quality: 86, cost: 94, response: 72, spend: "$3.06M", score: 82 },
  { name: "Coreline Industries", region: "USA", delivery: 88, quality: 89, cost: 80, response: 95, spend: "$1.72M", score: 87 },
  { name: "Meridian Pack", region: "Mexico", delivery: 69, quality: 74, cost: 91, response: 66, spend: "$1.19M", score: 75 },
];

const forecastData = [
  { d: "Jun 1", actual: 410, forecast: null, low: null, high: null },
  { d: "Jun 8", actual: 438, forecast: null, low: null, high: null },
  { d: "Jun 15", actual: 425, forecast: 425, low: 425, high: 425 },
  { d: "Jun 22", actual: null, forecast: 465, low: 421, high: 508 },
  { d: "Jun 29", actual: null, forecast: 492, low: 438, high: 548 },
  { d: "Jul 6", actual: null, forecast: 530, low: 466, high: 595 },
  { d: "Jul 13", actual: null, forecast: 574, low: 501, high: 648 },
  { d: "Jul 20", actual: null, forecast: 548, low: 468, high: 629 },
  { d: "Jul 27", actual: null, forecast: 602, low: 510, high: 694 },
];

const spendData = [
  { name: "Electronics", value: 38, color: C.blue },
  { name: "Industrial", value: 26, color: C.violet },
  { name: "Packaging", value: 18, color: C.cyan },
  { name: "Home appliance", value: 12, color: C.green },
  { name: "Other", value: 6, color: C.slate },
];

const routes = [
  { route: "Shanghai → Los Angeles", shipments: 184, success: 81, transit: 18.4, cost: 1280 },
  { route: "Hamburg → Newark", shipments: 142, success: 94, transit: 12.1, cost: 1060 },
  { route: "Monterrey → Dallas", shipments: 236, success: 97, transit: 3.8, cost: 620 },
  { route: "Taipei → Los Angeles", shipments: 118, success: 91, transit: 14.6, cost: 1175 },
];

const fmtMoney = (v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${Math.round(v / 1000)}k`;
const safeAverage = values => values.length ? values.reduce((a,b)=>a+(Number(b)||0),0) / values.length : 0;
const AnalyticsContext = createContext(null);
const useAnalytics = () => useContext(AnalyticsContext);

function App() {
  const [session, setSession] = useState(() => {
    const token = localStorage.getItem("axis_token");
    const user = localStorage.getItem("axis_user");
    return token && user ? { token, user: JSON.parse(user) } : null;
  });
  const [checking, setChecking] = useState(Boolean(session));
  useEffect(() => {
    if (!session) return;
    api("/api/me").then(() => setChecking(false)).catch(() => {
      localStorage.removeItem("axis_token");
      localStorage.removeItem("axis_user");
      setSession(null);
      setChecking(false);
    });
  }, []);
  if (checking) return <LoadingScreen label="Opening your workspace…"/>;
  if (!session) return <AuthScreen onAuthenticated={setSession}/>;
  return <Dashboard session={session} onLogout={() => {
    localStorage.removeItem("axis_token");
    localStorage.removeItem("axis_user");
    setSession(null);
  }}/>;
}

function Dashboard({ session, onLogout }) {
  const [page, setPage] = useState("executive");
  const [theme, setTheme] = useState("dark");
  const [sidebar, setSidebar] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [range, setRange] = useState("Last 12 months");
  const [region, setRegion] = useState("All regions");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataHub, setDataHub] = useState(false);

  const pageTitle = nav.find(n => n.id === page)?.label || "Overview";
  const navigate = (id) => { setPage(id); setMobileMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const toast = (msg) => { setNotice(msg); setTimeout(() => setNotice(""), 2800); };
  const refresh = async () => {
    setLoading(true);
    try { setAnalytics(await api("/api/analytics")); }
    catch (error) { toast(error.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, []);
  const initials = session.user.name.split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase();

  return (
    <AnalyticsContext.Provider value={analytics}>
    <div className={`app ${theme}`} data-collapsed={!sidebar}>
      <Sidebar page={page} navigate={navigate} open={sidebar} mobile={mobileMenu} close={() => setMobileMenu(false)} organization={session.user.organization} onData={() => setDataHub(true)} onLogout={onLogout}/>
      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-btn desktop-toggle" onClick={() => setSidebar(!sidebar)} aria-label="Toggle sidebar"><PanelLeftClose size={19} /></button>
            <button className="icon-btn mobile-toggle" onClick={() => setMobileMenu(true)} aria-label="Open menu"><Menu size={20} /></button>
            <div className="crumb"><span>Control tower</span><ChevronRight size={14}/><strong>{pageTitle}</strong></div>
          </div>
          <div className="top-actions">
            <div className="global-search">
              <Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search SKU, supplier, shipment..."/><kbd>⌘ K</kbd>
            </div>
            <button className="data-button" onClick={() => setDataHub(true)}><Database size={16}/><span>Manage data</span></button>
            <button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Change theme">{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</button>
            <button className="icon-btn notification" onClick={() => toast(`${analytics?.alerts?.length || 0} active operational alerts`)}><Bell size={18}/>{analytics?.alerts?.length > 0 && <i/>}</button>
            <div className="profile"><div className="avatar">{initials}</div><div><strong>{session.user.name}</strong><span>{session.user.organization}</span></div><ChevronDown size={14}/></div>
          </div>
        </header>

        <div className="content">
          <PageHeader page={page} range={range} setRange={setRange} region={region} setRegion={setRegion} toast={toast} user={session.user}/>
          {loading ? <LoadingPanel/> : !analytics?.has_data ? <EmptyWorkspace onOpen={() => setDataHub(true)}/> : <>
          {page === "executive" && <Executive navigate={navigate} />}
          {page === "inventory" && <Inventory search={search} />}
          {page === "warehouse" && <Warehouses />}
          {page === "suppliers" && <Suppliers search={search} />}
          {page === "logistics" && <Logistics />}
          {page === "forecast" && <Forecast />}
          {page === "procurement" && <Procurement />}
          {page === "scenarios" && <ScenarioStudio />}
          </>}
        </div>
      </main>
      {mobileMenu && <div className="scrim" onClick={() => setMobileMenu(false)}/>}
      {dataHub && <DataHub analytics={analytics} close={() => setDataHub(false)} onUpdated={async message => { await refresh(); toast(message); }}/>}
      {notice && <div className="toast"><Check size={17}/>{notice}</div>}
    </div>
    </AnalyticsContext.Provider>
  );
}

function Sidebar({ page, navigate, open, mobile, close, organization, onData, onLogout }) {
  return (
    <aside className={`sidebar ${open ? "" : "collapsed"} ${mobile ? "mobile-open" : ""}`}>
      <div className="brand"><div className="brandmark"><Command size={21}/></div><div className="brandcopy"><b>AXIS</b><span>Supply intelligence</span></div><button className="sidebar-close" onClick={close}><X size={20}/></button></div>
      <div className="workspace"><div className="workspace-icon">{organization.slice(0,2).toUpperCase()}</div><div><strong>{organization}</strong><span>Enterprise workspace</span></div><ChevronDown size={14}/></div>
      <nav>
        <div className="nav-label">Intelligence</div>
        {nav.map(({ id, label, icon: Icon, count }) => (
          <button key={id} className={page === id ? "active" : ""} onClick={() => navigate(id)} title={label}>
            <Icon size={18}/><span>{label}</span>{count && <em>{count}</em>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button onClick={onData}><Database size={18}/><span>Data sources</span></button>
        <button><HelpCircle size={18}/><span>Help & resources</span></button>
        <button onClick={onLogout}><LogOut size={18}/><span>Sign out</span></button>
        <div className="sync"><div><RefreshCw size={15}/><span>Data refreshed</span></div><b>Today, 9:42 AM</b></div>
      </div>
    </aside>
  );
}

function PageHeader({ page, range, setRange, region, setRegion, toast, user }) {
  const titles = {
    executive: ["Good morning, Alex", "Here’s the pulse of your global supply chain."],
    inventory: ["Inventory intelligence", "Optimize stock positions and release working capital."],
    warehouse: ["Warehouse network", "Monitor capacity, throughput, and operational efficiency."],
    suppliers: ["Supplier performance", "Evaluate reliability, quality, cost, and risk."],
    logistics: ["Logistics command", "Track delivery performance, cost, and route health."],
    forecast: ["Demand forecasting", "Turn predicted demand into confident inventory decisions."],
    procurement: ["Procurement analytics", "Consolidate spend and uncover sourcing opportunities."],
    scenarios: ["Scenario studio", "Stress-test your network before conditions change."],
  };
  titles.executive[0] = `Welcome, ${user?.name?.split(" ")[0] || "there"}`;
  return (
    <section className="page-header">
      <div><p className="eyebrow">{page === "executive" ? "Friday, June 19" : "Supply chain control tower"}</p><h1>{titles[page][0]}</h1><p>{titles[page][1]}</p></div>
      <div className="filters">
        <label><CalendarDays size={15}/><select value={range} onChange={e => setRange(e.target.value)}><option>Last 30 days</option><option>Last quarter</option><option>Last 12 months</option><option>Year to date</option></select></label>
        <label><Filter size={15}/><select value={region} onChange={e => setRegion(e.target.value)}><option>All regions</option><option>North America</option><option>Europe</option><option>Asia Pacific</option></select></label>
        <button className="export-btn" onClick={() => toast("Report prepared for export")}><Download size={16}/> Export</button>
      </div>
    </section>
  );
}

function Metric({ label, value, delta, trend = "up", icon: Icon, color = "blue", note }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${color}`}><Icon size={19}/></div>
      <div className="metric-top"><span>{label}</span><HelpCircle size={14}/></div>
      <strong>{value}</strong>
      <div className="metric-foot">
        {delta && <span className={`delta ${trend}`} >{trend === "up" ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {delta}</span>}
        <span>{note || "vs. prior period"}</span>
      </div>
    </article>
  );
}

const ChartTip = ({ active, payload, label, suffix = "" }) => {
  if (!active || !payload?.length) return null;
  return <div className="chart-tip"><b>{label}</b>{payload.filter(p => p.value != null).map((p, i) => <span key={i}><i style={{background:p.color}}/>{p.name}: <strong>{p.value}{suffix}</strong></span>)}</div>;
};

function SectionHead({ title, sub, action, onAction }) {
  return <div className="section-head"><div><h3>{title}</h3>{sub && <p>{sub}</p>}</div>{action && <button onClick={onAction}>{action}<ArrowRight size={15}/></button>}</div>;
}

function Executive({ navigate }) {
  const live = useAnalytics();
  const summary = live?.summary || {};
  const rData = live?.revenue_trend?.length ? live.revenue_trend : revenueData;
  const hData = live?.health?.length ? live.health : healthData;
  const fData = live?.warehouses?.length ? live.warehouses : facilityData;
  const aData = live?.alerts?.length ? live.alerts.map(x=>({...x,time:"Current",icon:x.target==="inventory"?Boxes:x.target==="logistics"?Truck:x.target==="warehouse"?Warehouse:TrendingUp})) : alerts;
  return (
    <>
      <div className="metrics-grid">
        <Metric label="Total revenue" value={fmtMoney(summary.revenue || 0)} icon={CircleDollarSign} color="blue" note="from connected sales"/>
        <Metric label="Gross margin" value={`${(summary.gross_margin || 0).toFixed(1)}%`} icon={TrendingUp} color="green" note="revenue less COGS"/>
        <Metric label="Inventory value" value={fmtMoney(summary.inventory_value || 0)} icon={Boxes} color="violet" note="current stock value"/>
        <Metric label="On-time delivery" value={`${(summary.on_time_delivery || 0).toFixed(1)}%`} icon={PackageCheck} color="cyan" note="connected shipments"/>
        <Metric label="Avg. lead time" value={`${(summary.avg_lead_time || 0).toFixed(1)}d`} icon={Activity} color="amber" note="purchase orders"/>
      </div>

      <div className="dashboard-grid executive-grid">
        <article className="panel revenue-panel">
          <SectionHead title="Revenue performance" sub="Revenue, target, and margin trend" action="View sales detail" />
          <div className="chart-legend"><span><i style={{background:C.blue}}/>Revenue</span><span><i className="line-dot"/>Target</span></div>
          <div className="chart-lg">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={rData} margin={{top:12,right:5,left:-18,bottom:0}}>
                <defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={C.blue} stopOpacity=".3"/><stop offset="1" stopColor={C.blue} stopOpacity="0"/></linearGradient></defs>
                <CartesianGrid stroke="var(--grid)" vertical={false}/>
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}}/>
                <YAxis axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}} tickFormatter={v=>`$${v}M`}/>
                <Tooltip content={<ChartTip suffix="M"/>}/>
                <Area name="Revenue" type="monotone" dataKey="revenue" stroke={C.blue} strokeWidth={2.5} fill="url(#rev)"/>
                <Line name="Target" type="monotone" dataKey="target" stroke={C.slate} strokeWidth={1.5} strokeDasharray="5 5" dot={false}/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel health-panel">
          <SectionHead title="Supply chain health" sub="Composite network score" />
          <div className="health-wrap">
            <div className="radial-score" style={{"--score":`${summary.health_score || 0}%`}}><div><strong>{summary.health_score || 0}</strong><span>/ 100</span><small>{(summary.health_score || 0)>=85?"Strong":"Watch"}</small></div></div>
            <div className="health-list">
              {hData.map(x => <div key={x.name}><span>{x.name}</span><div className="mini-track"><i style={{width:`${x.value}%`,background:x.color}}/></div><b>{x.value}</b></div>)}
            </div>
          </div>
          <div className="insight-callout"><Zap size={16}/><p><strong>Inventory balance is your biggest opportunity.</strong><br/>Resolving 12 stock risks could lift the score by 4 points.</p></div>
        </article>
      </div>

      <div className="dashboard-grid lower-grid">
        <article className="panel facility-panel">
          <SectionHead title="Warehouse performance" sub="Capacity and daily throughput" action="All warehouses" onAction={() => navigate("warehouse")}/>
          <div className="table-scroll"><table>
            <thead><tr><th>Facility</th><th>Utilization</th><th>Throughput / day</th><th>Status</th><th>WoW</th></tr></thead>
            <tbody>{fData.map(f => <tr key={f.code}><td><div className="table-title"><span className="facility-symbol"><Warehouse size={15}/></span><div><b>{f.name}</b><small>{f.code} · {f.region}</small></div></div></td><td><div className="util"><div><i style={{width:`${f.utilization}%`}}/></div><b>{f.utilization}%</b></div></td><td>{f.throughput} units</td><td><Status value={f.status}/></td><td><span className={f.change >= 0 ? "positive" : "negative"}>{f.change >= 0 ? "+" : ""}{f.change}%</span></td></tr>)}</tbody>
          </table></div>
        </article>
        <article className="panel alert-panel">
          <SectionHead title="Attention needed" sub="Prioritized operational signals" action="View all" />
          <div className="alert-list">{aData.map((a,i) => <button key={i} onClick={() => navigate(a.target || (i===0?"inventory":i===1?"logistics":i===2?"warehouse":"forecast"))}><span className={`alert-icon ${a.level}`}><a.icon size={17}/></span><span><b>{a.title}</b><small>{a.detail}</small></span><time>{a.time}</time><ChevronRight size={15}/></button>)}</div>
        </article>
      </div>
    </>
  );
}

function Inventory({ search }) {
  const live = useAnalytics();
  const summary = live?.summary || {};
  const inventoryData = live?.inventory?.length ? live.inventory : inventoryRows;
  const [tab, setTab] = useState("All inventory");
  const rows = inventoryData.filter(r => `${r.sku} ${r.product} ${r.category}`.toLowerCase().includes(search.toLowerCase()) && (tab === "All inventory" || r.status === tab));
  return (
    <>
      <div className="metrics-grid four">
        <Metric label="Current inventory" value={fmtMoney(summary.current_inventory || 0)} icon={Boxes} color="blue" note="connected inventory"/>
        <Metric label="Inventory turnover" value={`${(summary.inventory_turnover || 0).toFixed(1)}×`} icon={RefreshCw} color="green"/>
        <Metric label="Stockout rate" value={`${(summary.stockout_rate || 0).toFixed(1)}%`} icon={AlertTriangle} color="amber" note="below safety stock"/>
        <Metric label="Excess inventory" value={fmtMoney(summary.excess_inventory || 0)} icon={Container} color="violet" note="overstock value"/>
      </div>
      <div className="dashboard-grid split-65">
        <article className="panel">
          <SectionHead title="Inventory position" sub="Stock level relative to safety and reorder points"/>
          <div className="tabs">{["All inventory","Understock","Overstock","Healthy"].map(t=><button key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}>{t}</button>)}</div>
          <div className="table-scroll"><table>
            <thead><tr><th>Product</th><th>Current / safety</th><th>Inventory value</th><th>Age</th><th>Status</th></tr></thead>
            <tbody>{rows.map(r=><tr key={r.sku}><td><div className="table-title"><span className="sku-symbol">{r.product.slice(0,1)}</span><div><b>{r.product}</b><small>{r.sku} · {r.category}</small></div></div></td><td><b>{r.stock}</b> <span className="muted">/ {r.safety}</span></td><td>{fmtMoney(r.value)}</td><td>{r.age} days</td><td><Status value={r.status}/></td></tr>)}</tbody>
          </table></div>
        </article>
        <article className="panel">
          <SectionHead title="Capital concentration" sub="Inventory value by ABC class"/>
          <div className="abc-list">
            <div><span className="abc a">A</span><p><b>18% of SKUs</b><small>72% of inventory value</small></p><strong>$9.1M</strong></div>
            <div><span className="abc b">B</span><p><b>31% of SKUs</b><small>20% of inventory value</small></p><strong>$2.5M</strong></div>
            <div><span className="abc c">C</span><p><b>51% of SKUs</b><small>8% of inventory value</small></p><strong>$1.0M</strong></div>
          </div>
          <div className="recommendation"><Sparkles size={17}/><div><b>Optimization opportunity</b><p>Reducing AirPure Filter XL to its 90-day target would release <strong>$74.5k</strong> in working capital.</p><button>Review recommendation <ArrowRight size={14}/></button></div></div>
        </article>
      </div>
    </>
  );
}

function Warehouses() {
  const live = useAnalytics();
  const warehouseData = live?.warehouses?.length ? live.warehouses : facilityData;
  const bars = warehouseData.map(f=>({name:f.code, utilization:f.utilization, efficiency:f.efficiency || 86}));
  const avgUtil = safeAverage(warehouseData.map(x=>x.utilization));
  const avgEfficiency = safeAverage(warehouseData.map(x=>x.efficiency || 0));
  const throughput = warehouseData.reduce((sum,x)=>sum+(Number(x.throughput)||0),0);
  return (
    <>
      <div className="metrics-grid four">
        <Metric label="Network utilization" value={`${avgUtil.toFixed(1)}%`} icon={Gauge} color="blue"/>
        <Metric label="Daily throughput" value={throughput.toLocaleString()} icon={Activity} color="green"/>
        <Metric label="Picking efficiency" value={`${avgEfficiency.toFixed(1)}%`} icon={Target} color="cyan"/>
        <Metric label="Avg. processing time" value={`${safeAverage(warehouseData.map(x=>x.processing || 0)).toFixed(1)}h`} icon={ClipboardList} color="amber"/>
      </div>
      <div className="dashboard-grid split-60">
        <article className="panel"><SectionHead title="Capacity & efficiency" sub="Facility comparison"/>
          <div className="chart-md"><ResponsiveContainer width="100%" height="100%"><BarChart data={bars} margin={{left:-20,right:10}}><CartesianGrid stroke="var(--grid)" vertical={false}/><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}}/><YAxis axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}}/><Tooltip content={<ChartTip suffix="%"/>}/><Legend iconType="circle" iconSize={7}/><Bar dataKey="utilization" name="Utilization" fill={C.blue} radius={[5,5,0,0]}/><Bar dataKey="efficiency" name="Pick efficiency" fill={C.cyan} radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div>
        </article>
        <article className="panel network-card"><SectionHead title="Network snapshot" sub="Live capacity zones"/>
          <div className="network-map">
            <div className="map-lines"/>{warehouseData.slice(0,4).map((f,i)=><div className={`map-node n${i+1}`} key={f.code}><span className={f.utilization>90?"risk":f.utilization>85?"watch":"ok"}>{f.utilization}%</span><b>{f.code}</b></div>)}
          </div>
          <div className="map-key"><span><i className="ok"/>Healthy</span><span><i className="watch"/>Watch</span><span><i className="risk"/>Capacity risk</span></div>
        </article>
      </div>
      <article className="panel"><SectionHead title="Facility operations" sub="Detailed performance across your network"/>
        <div className="facility-cards">{warehouseData.map(f=><div className="facility-card" key={f.code}><div><span className="facility-symbol"><Warehouse size={17}/></span><Status value={f.status}/></div><h4>{f.name}</h4><small>{f.code} · {f.region}</small><div className="facility-stats"><p><span>Utilization</span><b>{f.utilization}%</b></p><p><span>Throughput</span><b>{f.throughput}</b></p></div><div className="big-track"><i style={{width:`${f.utilization}%`}}/></div></div>)}</div>
      </article>
    </>
  );
}

function Suppliers({ search }) {
  const live = useAnalytics();
  const summary = live?.summary || {};
  const supplierData = live?.suppliers?.length ? live.suppliers : supplierRows;
  const filtered = supplierData.filter(s => `${s.name} ${s.region}`.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <div className="metrics-grid four">
        <Metric label="Supplier reliability" value={(summary.supplier_reliability || 0).toFixed(1)} icon={ShieldCheck} color="green"/>
        <Metric label="On-time delivery" value={`${(summary.on_time_delivery || 0).toFixed(1)}%`} icon={PackageCheck} color="blue"/>
        <Metric label="Average lead time" value={`${(summary.avg_lead_time || 0).toFixed(1)}d`} icon={Activity} color="amber"/>
        <Metric label="Quality acceptance" value={`${safeAverage(supplierData.map(x=>x.quality)).toFixed(1)}%`} icon={Check} color="cyan"/>
      </div>
      <article className="panel">
        <SectionHead title="Supplier scorecard" sub="Weighted by delivery 40% · quality 30% · cost 20% · responsiveness 10%"/>
        <div className="table-scroll"><table className="supplier-table"><thead><tr><th>Supplier</th><th>Delivery</th><th>Quality</th><th>Cost</th><th>Response</th><th>Annual spend</th><th>Score</th></tr></thead>
        <tbody>{filtered.map(s=><tr key={s.name}><td><div className="table-title"><span className="supplier-symbol">{s.name.slice(0,2).toUpperCase()}</span><div><b>{s.name}</b><small>{s.region}</small></div></div></td><td><Score value={s.delivery}/></td><td><Score value={s.quality}/></td><td><Score value={s.cost}/></td><td><Score value={s.response}/></td><td>{s.spend}</td><td><span className={`score-ring ${s.score<80?"low":""}`}>{s.score}</span></td></tr>)}</tbody></table></div>
      </article>
      <div className="dashboard-grid thirds">
        <InsightCard icon={ShieldCheck} color="green" label="Top performer" title="Nexus Components" text="93 score · 96% on-time delivery" />
        <InsightCard icon={AlertTriangle} color="red" label="High risk" title="Meridian Pack" text="Delivery performance fell 8% this quarter" />
        <InsightCard icon={CircleDollarSign} color="blue" label="Savings potential" title="$284k identified" text="Consolidate packaging volume across 2 suppliers" />
      </div>
    </>
  );
}

function Score({value}) { return <div className="score-cell"><div><i style={{width:`${value}%`,background:value<80?C.red:value<90?C.amber:C.green}}/></div><span>{value}%</span></div> }
function InsightCard({icon:Icon,color,label,title,text}) { return <article className="panel insight-card"><span className={`metric-icon ${color}`}><Icon size={19}/></span><div><small>{label}</small><h4>{title}</h4><p>{text}</p></div><ArrowRight size={17}/></article> }

function Logistics() {
  const live = useAnalytics();
  const summary = live?.summary || {};
  const routeData = live?.routes?.length ? live.routes : routes;
  const routeChart = routeData.map(r=>({name:r.route.split(" → ")[0], cost:r.cost, success:r.success}));
  return (
    <>
      <div className="metrics-grid four">
        <Metric label="Delivery success rate" value={`${(summary.on_time_delivery || 0).toFixed(1)}%`} icon={PackageCheck} color="green"/>
        <Metric label="Transportation cost" value={fmtMoney(summary.transportation_cost || 0)} icon={CircleDollarSign} color="blue"/>
        <Metric label="Avg. transit time" value={`${safeAverage(routeData.map(x=>x.transit)).toFixed(1)}d`} icon={Truck} color="cyan"/>
        <Metric label="Cost per shipment" value={fmtMoney((summary.transportation_cost || 0)/(summary.shipment_count || 1))} icon={Container} color="violet"/>
      </div>
      <div className="dashboard-grid split-60">
        <article className="panel"><SectionHead title="Route performance" sub="Success rate and average shipment cost"/>
          <div className="chart-md"><ResponsiveContainer width="100%" height="100%"><ComposedChart data={routeChart} margin={{left:-14,right:0}}><CartesianGrid stroke="var(--grid)" vertical={false}/><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}}/><YAxis yAxisId="l" axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}}/><YAxis yAxisId="r" orientation="right" domain={[70,100]} axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}}/><Tooltip content={<ChartTip/>}/><Bar yAxisId="l" dataKey="cost" name="Cost / shipment" fill={C.blue} radius={[5,5,0,0]}/><Line yAxisId="r" dataKey="success" name="Success rate" stroke={C.green} strokeWidth={2.5}/></ComposedChart></ResponsiveContainer></div>
        </article>
        <article className="panel"><SectionHead title="Delay intelligence" sub="Root causes · trailing 30 days"/>
          <div className="delay-list">{[["Port congestion",38,C.red],["Carrier capacity",26,C.amber],["Customs clearance",18,C.violet],["Weather",11,C.blue],["Other",7,C.slate]].map(x=><div key={x[0]}><p><span>{x[0]}</span><b>{x[1]}%</b></p><div><i style={{width:`${x[1]*2.3}%`,background:x[2]}}/></div></div>)}</div>
        </article>
      </div>
      <article className="panel"><SectionHead title="Active trade lanes" sub="Performance across primary routes"/>
        <div className="table-scroll"><table><thead><tr><th>Trade lane</th><th>Shipments</th><th>Success rate</th><th>Avg. transit</th><th>Cost / shipment</th><th>Signal</th></tr></thead><tbody>{routeData.map(r=><tr key={r.route}><td><b>{r.route}</b></td><td>{r.shipments}</td><td>{r.success}%</td><td>{r.transit} days</td><td>${r.cost.toLocaleString()}</td><td><Status value={r.success<85?"At risk":r.success<93?"Watch":"Healthy"}/></td></tr>)}</tbody></table></div>
      </article>
    </>
  );
}

function Forecast() {
  const live = useAnalytics();
  const forecast = live?.forecast?.length ? live.forecast : forecastData;
  const [horizon,setHorizon] = useState("90 days");
  return (
    <>
      <div className="metrics-grid four">
        <Metric label="Forecast accuracy" value="92.4%" delta="3.1%" icon={Target} color="green"/>
        <Metric label={`${horizon} demand`} value="184.6k" delta="12.8%" icon={TrendingUp} color="blue"/>
        <Metric label="Demand volatility" value="18.2%" delta="2.4%" trend="down" icon={Activity} color="violet" note="lower variance"/>
        <Metric label="SKUs at risk" value="12" delta="5 resolved" trend="down" icon={AlertTriangle} color="amber" note="this week"/>
      </div>
      <article className="panel">
        <div className="section-head forecast-head"><div><h3>Demand projection</h3><p>Actual and model forecast with confidence range</p></div><div className="tabs">{["30 days","90 days","6 months"].map(t=><button key={t} className={horizon===t?"active":""} onClick={()=>setHorizon(t)}>{t}</button>)}</div></div>
        <div className="forecast-summary"><div><span>Selected portfolio</span><b>All products</b></div><div><span>Model</span><b>XGBoost ensemble</b></div><div><span>Confidence</span><b>95% interval</b></div><div><span>Last trained</span><b>Today, 06:00</b></div></div>
        <div className="chart-xl"><ResponsiveContainer width="100%" height="100%"><LineChart data={forecast} margin={{left:-15,right:10,top:15}}><CartesianGrid stroke="var(--grid)" vertical={false}/><XAxis dataKey="d" axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}}/><YAxis axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}}/><Tooltip content={<ChartTip/>}/><Line dataKey="high" name="Upper bound" stroke={C.blue} strokeOpacity=".25" dot={false}/><Line dataKey="low" name="Lower bound" stroke={C.blue} strokeOpacity=".25" dot={false}/><Line dataKey="actual" name="Actual" stroke={C.cyan} strokeWidth={2.5} dot={{r:3}}/><Line dataKey="forecast" name="Forecast" stroke={C.blue} strokeWidth={2.5} strokeDasharray="7 5" dot={{r:3}}/></LineChart></ResponsiveContainer></div>
      </article>
      <div className="dashboard-grid thirds">
        <InsightCard icon={TrendingUp} color="blue" label="Expected demand spike" title="+28% in home appliances" text="Peak expected July 13–20 · increase safety stock now" />
        <InsightCard icon={Boxes} color="amber" label="Inventory recommendation" title="Reorder 8 priority SKUs" text="Place orders within 5 days to protect service levels" />
        <InsightCard icon={Sparkles} color="violet" label="Seasonal pattern" title="Summer lift detected" text="Cooling and outdoor categories are trending above plan" />
      </div>
    </>
  );
}

function Procurement() {
  const live = useAnalytics();
  const summary = live?.summary || {};
  const spend = live?.spend_categories?.length ? live.spend_categories : spendData;
  const suppliersForSpend = live?.suppliers?.length ? live.suppliers : supplierRows;
  return (
    <>
      <div className="metrics-grid four">
        <Metric label="Purchase spend" value={fmtMoney(summary.purchase_spend || 0)} icon={ShoppingCart} color="blue"/>
        <Metric label="Cost savings" value="$842k" delta="18.6%" icon={CircleDollarSign} color="green"/>
        <Metric label="Active suppliers" value={summary.active_suppliers || 0} icon={Users} color="violet"/>
        <Metric label="Supplier dependency" value="24.8%" delta="3.1%" trend="down" icon={ShieldCheck} color="amber" note="risk reduction"/>
      </div>
      <div className="dashboard-grid split-55">
        <article className="panel"><SectionHead title="Spend by category" sub="Share of total procurement spend"/>
          <div className="donut-wrap"><div className="donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={spend} dataKey="value" innerRadius={62} outerRadius={91} paddingAngle={3} stroke="none">{spend.map(x=><Cell key={x.name} fill={x.color}/>)}</Pie><Tooltip content={<ChartTip suffix="%"/>}/></PieChart></ResponsiveContainer><div><strong>{fmtMoney(summary.purchase_spend || 0)}</strong><span>Total spend</span></div></div><div className="donut-legend">{spend.map(x=><div key={x.name}><span><i style={{background:x.color}}/>{x.name}</span><b>{x.value}%</b></div>)}</div></div>
        </article>
        <article className="panel"><SectionHead title="Savings pipeline" sub="Validated procurement opportunities"/>
          <div className="savings-total"><span>Potential annual savings</span><strong>$1.26M</strong><em>6.8% of addressable spend</em></div>
          <div className="opportunity-list"><div><span className="number">01</span><p><b>Consolidate packaging suppliers</b><small>$284k · Low effort</small></p><Status value="Recommended"/></div><div><span className="number">02</span><p><b>Renegotiate Pacific Forge terms</b><small>$216k · Medium effort</small></p><Status value="Review"/></div><div><span className="number">03</span><p><b>Shift air freight to ocean</b><small>$198k · Medium effort</small></p><Status value="Review"/></div></div>
        </article>
      </div>
      <article className="panel"><SectionHead title="Supplier concentration" sub="Purchase volume and dependency risk"/>
        <div className="table-scroll"><table><thead><tr><th>Supplier</th><th>Region</th><th>Purchase volume</th><th>Reliability score</th><th>Dependency risk</th></tr></thead><tbody>{suppliersForSpend.slice(0,6).map((s,i)=><tr key={s.name}><td><b>{s.name}</b></td><td>{s.region}</td><td>{s.spend}</td><td>{s.score}</td><td><Status value={i===0?"High":i===1?"Medium":"Low"}/></td></tr>)}</tbody></table></div>
      </article>
    </>
  );
}

function ScenarioStudio() {
  const [lead,setLead]=useState(20), [demand,setDemand]=useState(40), [fuel,setFuel]=useState(15), [capacity,setCapacity]=useState(10);
  const results = useMemo(()=>({
    cost: 2.1 + fuel*.11 + lead*.04 + capacity*.03,
    revenue: demand*.18 - lead*.07 - capacity*.06,
    inventory: demand*.22 + lead*.17,
    service: 96.2 - demand*.11 - lead*.09 - capacity*.08
  }),[lead,demand,fuel,capacity]);
  return (
    <>
      <div className="scenario-layout">
        <article className="panel scenario-controls">
          <SectionHead title="Assumptions" sub="Adjust variables to model network impact"/>
          <Slider label="Supplier lead time" value={lead} setValue={setLead} max={60} icon={Building2}/>
          <Slider label="Demand increase" value={demand} setValue={setDemand} max={80} icon={TrendingUp}/>
          <Slider label="Fuel price increase" value={fuel} setValue={setFuel} max={50} icon={Truck}/>
          <Slider label="Warehouse capacity decrease" value={capacity} setValue={setCapacity} max={35} icon={Warehouse}/>
          <button className="primary-btn"><Sparkles size={16}/> Save this scenario</button>
        </article>
        <div className="scenario-results">
          <div className="scenario-banner"><div><span><Sparkles size={16}/> Live impact model</span><h2>Demand surge + supply constraint</h2><p>Projected impact over the next 90 days based on your current network.</p></div><div className="risk-index"><span>Risk score</span><strong>{Math.min(99,Math.round(42+lead*.4+demand*.3+fuel*.2))}</strong><small>Elevated</small></div></div>
          <div className="impact-grid">
            <Impact label="Operating cost" value={`+${results.cost.toFixed(1)}%`} detail={`+$${(results.cost*.47).toFixed(1)}M projected`} bad icon={CircleDollarSign}/>
            <Impact label="Revenue" value={`${results.revenue>=0?"+":""}${results.revenue.toFixed(1)}%`} detail={`${results.revenue>=0?"$3.2M upside":"Revenue at risk"}`} bad={results.revenue<0} icon={TrendingUp}/>
            <Impact label="Inventory need" value={`+${results.inventory.toFixed(1)}%`} detail="Additional safety stock" bad icon={Boxes}/>
            <Impact label="Service level" value={`${results.service.toFixed(1)}%`} detail={`${(96.2-results.service).toFixed(1)} pts below baseline`} bad={results.service<92} icon={PackageCheck}/>
          </div>
          <article className="panel actions-panel"><SectionHead title="Recommended mitigations" sub="Actions ranked by projected business impact"/>
            <div className="mitigation"><span>1</span><div><b>Expedite priority purchase orders</b><p>Protects 94% service level for 8 critical SKUs.</p></div><em>High impact</em><button><ArrowRight size={16}/></button></div>
            <div className="mitigation"><span>2</span><div><b>Shift volume to Dallas Fulfillment</b><p>Offsets Chicago capacity pressure by 7.2%.</p></div><em>High impact</em><button><ArrowRight size={16}/></button></div>
            <div className="mitigation"><span>3</span><div><b>Activate Nexus backup allocation</b><p>Reduces lead-time exposure across electronics.</p></div><em className="medium">Medium</em><button><ArrowRight size={16}/></button></div>
          </article>
        </div>
      </div>
    </>
  );
}

function Slider({label,value,setValue,max,icon:Icon}) {
  return <div className="slider-control"><div><span><Icon size={16}/>{label}</span><b>{value}%</b></div><input type="range" min="0" max={max} value={value} onChange={e=>setValue(+e.target.value)} style={{"--fill":`${value/max*100}%`}}/><div className="range-labels"><span>Baseline</span><span>+{max}%</span></div></div>
}
function Impact({label,value,detail,bad,icon:Icon}) { return <article className="panel impact-card"><span className={`metric-icon ${bad?"red":"green"}`}><Icon size={19}/></span><div><small>{label}</small><strong className={bad?"bad":"good"}>{value}</strong><p>{detail}</p></div></article> }

function Status({value}) {
  const low = value.toLowerCase();
  const tone = ["healthy","low","recommended"].some(x=>low.includes(x)) ? "good" : ["risk","under","high","capacity"].some(x=>low.includes(x)) ? "bad" : ["watch","medium","review","overstock"].some(x=>low.includes(x)) ? "warn" : "neutral";
  return <span className={`status ${tone}`}><i/>{value}</span>;
}

function LoadingScreen({ label }) {
  return <div className="auth-shell"><div className="loading-screen"><div className="brandmark"><Command size={25}/></div><LoaderCircle className="spin" size={24}/><p>{label}</p></div></div>;
}

function LoadingPanel() {
  return <div className="panel loading-panel"><LoaderCircle className="spin" size={24}/><strong>Analyzing your supply chain data…</strong><span>Calculating KPIs, risks, and forecasts</span></div>;
}

function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", organization: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async e => {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const result = await api(`/api/auth/${mode}`, { method: "POST", body: JSON.stringify(form) }, null);
      localStorage.setItem("axis_token", result.token);
      localStorage.setItem("axis_user", JSON.stringify(result.user));
      onAuthenticated(result);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };
  return <div className="auth-shell">
    <section className="auth-story">
      <div className="auth-brand"><div className="brandmark"><Command size={22}/></div><div><b>AXIS</b><span>Supply intelligence</span></div></div>
      <div className="story-copy"><span className="auth-kicker"><Sparkles size={14}/> Connected decisions, end to end</span><h1>Your supply chain.<br/><em>Finally in focus.</em></h1><p>Bring procurement, inventory, logistics, and demand data together. Axis turns every upload into decisions your team can act on.</p>
        <div className="story-points"><div><ShieldCheck/><span><b>Private workspaces</b><small>Your organization's data stays isolated.</small></span></div><div><Zap/><span><b>Analysis in seconds</b><small>KPIs, risks, and recommendations update automatically.</small></span></div><div><TrendingUp/><span><b>Forward-looking</b><small>Forecast demand before it becomes a stock problem.</small></span></div></div>
      </div>
      <small className="auth-footnote">Enterprise analytics without the spreadsheet maze.</small>
    </section>
    <section className="auth-form-wrap">
      <form className="auth-form" onSubmit={submit}>
        <span className="eyebrow">{mode === "login" ? "Welcome back" : "Create your workspace"}</span>
        <h2>{mode === "login" ? "Sign in to Axis" : "Start analyzing your data"}</h2>
        <p>{mode === "login" ? "Enter your details to access your control tower." : "Set up your secure organization workspace."}</p>
        {mode === "register" && <div className="auth-row"><AuthField icon={UserRound} label="Your name" value={form.name} onChange={v=>setForm({...form,name:v})}/><AuthField icon={Building2} label="Organization" value={form.organization} onChange={v=>setForm({...form,organization:v})}/></div>}
        <AuthField icon={Mail} type="email" label="Work email" value={form.email} onChange={v=>setForm({...form,email:v})}/>
        <AuthField icon={LockKeyhole} type="password" label="Password" value={form.password} onChange={v=>setForm({...form,password:v})} hint={mode==="register" ? "At least 8 characters" : ""}/>
        {error && <div className="auth-error"><AlertTriangle size={15}/>{error}</div>}
        <button className="auth-submit" disabled={busy}>{busy ? <LoaderCircle className="spin" size={17}/> : mode === "login" ? "Sign in" : "Create workspace"}{!busy && <ArrowRight size={16}/>}</button>
        <div className="auth-switch">{mode === "login" ? "New to Axis?" : "Already have an account?"}<button type="button" onClick={()=>{setMode(mode==="login"?"register":"login");setError("")}}>{mode === "login" ? "Create an account" : "Sign in"}</button></div>
      </form>
    </section>
  </div>;
}

function AuthField({ icon: Icon, label, value, onChange, type="text", hint }) {
  return <label className="auth-field"><span>{label}</span><div><Icon size={16}/><input required type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={label}/></div>{hint && <small>{hint}</small>}</label>;
}

function EmptyWorkspace({ onOpen }) {
  return <div className="empty-workspace panel"><div className="empty-visual"><Database size={31}/><span><FileSpreadsheet size={19}/></span></div><span className="eyebrow">Workspace ready</span><h2>Connect your first data source</h2><p>Upload your CSV or Excel exports and Axis will calculate the dashboard automatically. Start with one source or combine all seven for the complete view.</p><div><button className="primary-btn" onClick={onOpen}><UploadCloud size={16}/> Upload data</button></div><small>Not ready with your own files? Load the built-in demo dataset from the data manager.</small></div>;
}

const sourceTypes = [
  ["sales","Sales","Revenue, quantity, date and COGS",CircleDollarSign],
  ["inventory","Inventory","Stock, safety levels and cost",Boxes],
  ["shipments","Shipments","Routes, delays and freight cost",Truck],
  ["purchase_orders","Purchase orders","Spend, receipts and lead time",ClipboardList],
  ["products","Products","SKU, name, category and brand",Container],
  ["suppliers","Suppliers","Reliability, quality and region",Building2],
  ["warehouses","Warehouses","Facility capacity and efficiency",Warehouse],
];

function DataHub({ analytics, close, onUpdated }) {
  const [uploading, setUploading] = useState("");
  const [error, setError] = useState("");
  const upload = async (entity, file) => {
    if (!file) return;
    setUploading(entity); setError("");
    const body = new FormData(); body.append("entity", entity); body.append("file", file);
    try {
      const result = await api("/api/upload", { method: "POST", body });
      await onUpdated(`${result.rows.toLocaleString()} ${entity.replace("_"," ")} rows analyzed`);
    } catch (err) { setError(err.message); }
    finally { setUploading(""); }
  };
  const demo = async () => {
    setUploading("demo"); setError("");
    try { await api("/api/demo", { method:"POST" }); await onUpdated("Demo supply chain loaded"); }
    catch(err){ setError(err.message); } finally { setUploading(""); }
  };
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&close()}>
    <section className="data-hub">
      <header><div><span className="eyebrow">Data workspace</span><h2>Manage data sources</h2><p>Upload CSV or XLSX files. A new upload replaces that source and refreshes every related chart.</p></div><button className="icon-btn" onClick={close}><X size={19}/></button></header>
      <div className="data-summary"><div><Database size={18}/><span><b>{Object.values(analytics?.sources || {}).reduce((a,b)=>a+b,0).toLocaleString()}</b><small>Total records</small></span></div><div><Activity size={18}/><span><b>{Object.keys(analytics?.sources || {}).length} / 7</b><small>Sources connected</small></span></div><button onClick={demo} disabled={Boolean(uploading)}>{uploading==="demo"?<LoaderCircle className="spin" size={15}/>:<Sparkles size={15}/>} Load demo data</button></div>
      {error && <div className="auth-error"><AlertTriangle size={15}/>{error}</div>}
      <div className="source-grid">{sourceTypes.map(([id,name,description,Icon])=><article className={analytics?.sources?.[id] ? "connected" : ""} key={id}><span className="source-icon"><Icon size={18}/></span><div><h4>{name}</h4><p>{description}</p><small>{analytics?.sources?.[id] ? `${analytics.sources[id].toLocaleString()} rows connected` : "Not connected"}</small></div><div className="source-actions"><a href={`${API_URL}/api/templates/${id}.csv`}><Download size={14}/>Template</a><label className={uploading===id?"busy":""}>{uploading===id?<LoaderCircle className="spin" size={15}/>:<UploadCloud size={15}/>}<span>{analytics?.sources?.[id]?"Replace":"Upload"}</span><input type="file" accept=".csv,.xlsx,.xlsm" onChange={e=>upload(id,e.target.files[0])}/></label></div></article>)}</div>
      <footer><p><ShieldCheck size={14}/> Data is stored locally in your private workspace.</p><button className="primary-btn" onClick={close}>View dashboard <ArrowRight size={15}/></button></footer>
    </section>
  </div>;
}

export default App;
