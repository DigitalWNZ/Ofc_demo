export default function ArchitectureDiagram() {
  const leftX = 30;
  const boxW = 340;
  const gap = 40;
  const rightX = leftX + boxW + gap;

  // Three source boxes
  const srcH = 72;
  const srcGap = 14;
  const src1Y = 52;
  const src2Y = src1Y + srcH + srcGap;
  const src3Y = src2Y + srcH + srcGap;
  const sourcesEndY = src3Y + srcH;

  // OKF box spans all three sources
  const okfH = sourcesEndY - src1Y;

  // Bottom section
  const bottomY = sourcesEndY + 70;
  const bottomBoxH = 170;

  return (
    <div className="arch-diagram-wrapper">
      <h3 className="arch-diagram-title">整体架构</h3>
      <svg viewBox="0 0 780 580" className="arch-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#94a3b8" />
          </marker>
          <marker id="arrow-indigo" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#818cf8" />
          </marker>
          <marker id="arrow-amber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#f59e0b" />
          </marker>
          <linearGradient id="gcp-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* ===== Section header: ① 数据源 ===== */}
        <text x={leftX + boxW / 2} y={38} textAnchor="middle" fill="#374151" fontSize="13" fontWeight="600" fontFamily="Google Sans, sans-serif">① 数据源</text>

        {/* ===== Source 1: BigQuery (blue) ===== */}
        <rect x={leftX} y={src1Y} width={boxW} height={srcH} rx="10" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
        <circle cx={leftX + 18} cy={src1Y + srcH / 2} r="6" fill="#3b82f6" />
        <text x={leftX + 32} y={src1Y + 22} fill="#1e40af" fontSize="12" fontWeight="600" fontFamily="Google Sans, sans-serif">BigQuery · GA4 游戏分析</text>
        <text x={leftX + 32} y={src1Y + 40} fill="#3b82f6" fontSize="10" fontFamily="Roboto, sans-serif">17 张表 · 168 个字段</text>
        <text x={leftX + 32} y={src1Y + 56} fill="#60a5fa" fontSize="9" fontFamily="Roboto, sans-serif">事件、留存、收入、LTV、A/B 测试</text>

        {/* ===== Source 2: StarRocks (orange) ===== */}
        <rect x={leftX} y={src2Y} width={boxW} height={srcH} rx="10" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.5" />
        <circle cx={leftX + 18} cy={src2Y + srcH / 2} r="6" fill="#f59e0b" />
        <text x={leftX + 32} y={src2Y + 22} fill="#92400e" fontSize="12" fontWeight="600" fontFamily="Google Sans, sans-serif">StarRocks · 支付归因</text>
        <text x={leftX + 32} y={src2Y + 40} fill="#d97706" fontSize="10" fontFamily="Roboto, sans-serif">4 张表 · 24 个字段</text>
        <text x={leftX + 32} y={src2Y + 56} fill="#fbbf24" fontSize="9" fontFamily="Roboto, sans-serif">Adjust 回调、收入、成本、留存队列</text>

        {/* ===== Source 3: Unstructured (purple) ===== */}
        <rect x={leftX} y={src3Y} width={boxW} height={srcH} rx="10" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1.5" />
        <circle cx={leftX + 18} cy={src3Y + srcH / 2} r="6" fill="#a855f7" />
        <text x={leftX + 32} y={src3Y + 22} fill="#6b21a8" fontSize="12" fontWeight="600" fontFamily="Google Sans, sans-serif">非结构化文档</text>
        <text x={leftX + 32} y={src3Y + 40} fill="#7c3aed" fontSize="10" fontFamily="Roboto, sans-serif">16 篇业务文档</text>
        <text x={leftX + 32} y={src3Y + 56} fill="#a78bfa" fontSize="9" fontFamily="Roboto, sans-serif">竞品分析、AI 能力评估、投放复盘</text>

        {/* Arrows: each source → OKF */}
        <line x1={leftX + boxW} y1={src1Y + srcH / 2} x2={rightX} y2={src1Y + srcH / 2} stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />
        <line x1={leftX + boxW} y1={src2Y + srcH / 2} x2={rightX} y2={src2Y + srcH / 2} stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />
        <line x1={leftX + boxW} y1={src3Y + srcH / 2} x2={rightX} y2={src3Y + srcH / 2} stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />

        {/* ===== ② OKF 上下文抽取 ===== */}
        <rect x={rightX} y={src1Y} width={boxW} height={okfH} rx="12" fill="#fefce8" stroke="#facc15" strokeWidth="1.5" />
        <text x={rightX + boxW / 2} y={src1Y + 22} textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="600" fontFamily="Google Sans, sans-serif">② OKF 上下文抽取</text>
        <text x={rightX + boxW / 2} y={src1Y + 38} textAnchor="middle" fill="#a16207" fontSize="10" fontFamily="Roboto, sans-serif">Open Knowledge Format · Markdown + YAML</text>

        {/* Three catalog entries inside OKF box */}
        <g transform={`translate(${rightX + 15}, ${src1Y + 50})`}>
          <rect x="0" y="0" width="310" height="40" rx="6" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
          <circle cx="14" cy="20" r="5" fill="#3b82f6" />
          <text x="28" y="15" fill="#1e40af" fontSize="10" fontWeight="500" fontFamily="Google Sans, sans-serif">bigquery_data_meta</text>
          <text x="28" y="31" fill="#78350f" fontSize="9" fontFamily="Roboto, sans-serif">表/字段语义、数据分层、技术元数据</text>

          <rect x="0" y="48" width="310" height="40" rx="6" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
          <circle cx="14" cy="68" r="5" fill="#f59e0b" />
          <text x="28" y="63" fill="#92400e" fontSize="10" fontWeight="500" fontFamily="Google Sans, sans-serif">starrock_data_meta</text>
          <text x="28" y="79" fill="#78350f" fontSize="9" fontFamily="Roboto, sans-serif">支付/归因表结构与字段定义</text>

          <rect x="0" y="96" width="310" height="40" rx="6" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
          <circle cx="14" cy="116" r="5" fill="#a855f7" />
          <text x="28" y="111" fill="#6b21a8" fontSize="10" fontWeight="500" fontFamily="Google Sans, sans-serif">unstructure_data_meta</text>
          <text x="28" y="127" fill="#78350f" fontSize="9" fontFamily="Roboto, sans-serif">业务知识文档摘要与关系标注</text>
        </g>

        <text x={rightX + boxW / 2} y={src1Y + okfH - 10} textAnchor="middle" fill="#a16207" fontSize="9" fontFamily="Roboto Mono, monospace">Git 版本管理 · 标签: system / kind</text>

        {/* Arrow: ② straight down to ③ */}
        <line x1={rightX + boxW / 2} y1={sourcesEndY} x2={rightX + boxW / 2} y2={bottomY} stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow-indigo)" />
        <text x={rightX + boxW / 2 + 20} y={sourcesEndY + 40} fill="#818cf8" fontSize="10" fontWeight="500" fontFamily="Roboto, sans-serif">推送元数据</text>

        {/* ===== Google Cloud background ===== */}
        <rect x={leftX} y={bottomY - 15} width={boxW * 2 + gap} height={bottomBoxH + 30} rx="14" fill="url(#gcp-grad)" stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="6 3" />
        <text x={leftX + (boxW * 2 + gap) / 2} y={bottomY + 4} textAnchor="middle" fill="#6366f1" fontSize="11" fontWeight="600" fontFamily="Google Sans, sans-serif">Google Cloud Platform</text>

        {/* ===== BOTTOM LEFT: ④ Web App ===== */}
        <rect x={leftX + 10} y={bottomY + 15} width={boxW - 20} height={bottomBoxH - 20} rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x={leftX + boxW / 2} y={bottomY + 38} textAnchor="middle" fill="#166534" fontSize="13" fontWeight="600" fontFamily="Google Sans, sans-serif">④ Web 应用展示</text>
        <text x={leftX + boxW / 2} y={bottomY + 54} textAnchor="middle" fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">Cloud Run 部署 · 无需登录即可访问</text>
        <line x1={leftX + 28} y1={bottomY + 63} x2={leftX + boxW - 28} y2={bottomY + 63} stroke="#bbf7d0" strokeWidth="1" />
        <text x={leftX + 30} y={bottomY + 80} fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">• 自然语言搜索数据资产</text>
        <text x={leftX + 30} y={bottomY + 96} fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">• 查看表结构与字段描述</text>
        <text x={leftX + 30} y={bottomY + 112} fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">• 元数据标签（Owner / 分区 / 粒度）</text>
        <text x={leftX + 30} y={bottomY + 128} fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">• 面向非技术用户的可视化界面</text>

        {/* Arrow: ③ → ④ */}
        <line x1={rightX + 10} y1={bottomY + 15 + (bottomBoxH - 20) / 2} x2={leftX + boxW - 10} y2={bottomY + 15 + (bottomBoxH - 20) / 2} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x={leftX + boxW + gap / 2} y={bottomY + 15 + (bottomBoxH - 20) / 2 - 8} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Roboto, sans-serif">Search API</text>

        {/* ===== BOTTOM RIGHT: ③ Knowledge Catalog ===== */}
        <rect x={rightX + 10} y={bottomY + 15} width={boxW - 20} height={bottomBoxH - 20} rx="10" fill="#eef2ff" stroke="#818cf8" strokeWidth="1.5" />
        <text x={rightX + boxW / 2} y={bottomY + 38} textAnchor="middle" fill="#312e81" fontSize="13" fontWeight="600" fontFamily="Google Sans, sans-serif">③ Knowledge Catalog</text>
        <text x={rightX + boxW / 2} y={bottomY + 54} textAnchor="middle" fill="#4338ca" fontSize="10" fontFamily="Roboto, sans-serif">语义搜索引擎</text>
        <line x1={rightX + 28} y1={bottomY + 63} x2={rightX + boxW - 28} y2={bottomY + 63} stroke="#c7d2fe" strokeWidth="1" />
        <text x={rightX + 30} y={bottomY + 80} fill="#4f46e5" fontSize="10" fontFamily="Roboto, sans-serif">• 自然语言理解与语义匹配</text>
        <text x={rightX + 30} y={bottomY + 96} fill="#4f46e5" fontSize="10" fontFamily="Roboto, sans-serif">• 基于上下文的智能排序</text>
        <text x={rightX + 30} y={bottomY + 112} fill="#4f46e5" fontSize="10" fontFamily="Roboto, sans-serif">• 元数据索引与全文检索</text>
        <text x={rightX + 30} y={bottomY + 128} fill="#4f46e5" fontSize="10" fontFamily="Roboto, sans-serif">• Catalog Search / Lookup API</text>
      </svg>

      <div className="arch-core-value">
        <span className="arch-core-value-label">核心价值</span>
        <span className="arch-core-value-text">让任何人和任何 Agent 都能快速发现和理解数据资产 — 无需记表名 · 无需问数据工程师</span>
      </div>
    </div>
  );
}
