/* === 1. JSON VERİ === */
const projectionData = [
  { time:"Week 1",  cost:0,    income:0 },
  { time:"Week 2",  cost:500,  income:1500 },
  { time:"Week 3",  cost:1200, income:2800 },
  { time:"Week 4",  cost:2000, income:4200 },
  { time:"Month 1", cost:3000, income:7000 },
  { time:"Month 2", cost:4500, income:14000 },
  { time:"Month 3", cost:6000, income:25000 }
];

/* === 2. NET PROFIT HESABI === */
projectionData.forEach(d => {
  d.netProfit = d.income - d.cost;
});

/* === 3. GRAFİK AYARLARI === */
const chartHeight = 260;
const maxValue = 30000;
const stepX = 100;

/* === 4. Y DÖNÜŞÜMÜ === */
function mapY(value){
  return chartHeight - (value / maxValue) * chartHeight;
}

/* === 5. POINT OLUŞTUR === */
function buildPoints(key){
  return projectionData
    .map((d,i)=>`${i*stepX},${mapY(d[key])}`)
    .join(" ");
}

/* === 6. SVG DOLDUR === */
document.getElementById("costLine")
  .setAttribute("points", buildPoints("cost"));

document.getElementById("incomeLine")
  .setAttribute("points", buildPoints("income"));

document.getElementById("profitLine")
  .setAttribute("points", buildPoints("netProfit"));
