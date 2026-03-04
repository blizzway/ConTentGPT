import { useState, useRef } from "react";

const TEMPLATES = [
  { id: "blog", label: "Blog Post", icon: "📝", description: "Long-form articles & thought leadership" },
  { id: "social", label: "Social Media", icon: "📱", description: "Captions for Instagram, LinkedIn, Twitter" },
  { id: "ad", label: "Ad Copy", icon: "🎯", description: "High-converting ads & CTAs" },
  { id: "email", label: "Email Campaign", icon: "📧", description: "Newsletters & cold outreach" },
  { id: "product", label: "Product Description", icon: "🛍️", description: "eCommerce & landing page copy" },
  { id: "video", label: "Video Script", icon: "🎬", description: "YouTube, TikTok & podcast scripts" },
];

const TONES = ["Professional", "Casual", "Witty", "Persuasive", "Inspirational", "Empathetic"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Portuguese", "Japanese", "Arabic", "Chinese"];

const HISTORY_KEY = "contentHistory";

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch { return []; }
}
function saveHistory(item) {
  const h = getHistory();
  h.unshift(item);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 20)));
}

function Sidebar({ active, setActive, history, onHistorySelect, collapsed, setCollapsed, showHistory, setShowHistory }) {
  const w = collapsed ? 64 : 230;
  return (
    <aside style={{
      width: w, minHeight: "100vh", background: "#0a0a0f",
      borderRight: "1px solid #1e1e2e", display: "flex", flexDirection: "column",
      padding: "0", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 10,
      transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden"
    }}>
      <div style={{ padding: collapsed ? "22px 0" : "22px 24px 18px", borderBottom: "1px solid #1e1e2e", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          <div style={{
            minWidth: 34, width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, #f97316, #ef4444)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 900, color: "#fff", flexShrink: 0
          }}>C</div>
          {!collapsed && (
            <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#f0f0ff", fontWeight: 700, letterSpacing: -0.5 }}>ContentGPT</div>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: 1, textTransform: "uppercase" }}>AI Content Suite</div>
            </div>
          )}
        </div>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} title="Collapse sidebar" style={{
            background: "transparent", border: "1px solid #1e1e2e", borderRadius: 7,
            color: "#555", cursor: "pointer", fontSize: 14, padding: "4px 8px",
            display: "flex", alignItems: "center", flexShrink: 0, transition: "all 0.15s"
          }}>‹</button>
        )}
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)} title="Expand sidebar" style={{
          background: "transparent", border: "none", color: "#555", cursor: "pointer",
          fontSize: 18, padding: "10px 0", textAlign: "center", width: "100%",
          transition: "color 0.15s"
        }}
          onMouseEnter={e => e.currentTarget.style.color = "#f97316"}
          onMouseLeave={e => e.currentTarget.style.color = "#555"}>›</button>
      )}

      <nav style={{ flex: 1, padding: collapsed ? "12px 8px" : "16px 12px", overflowY: "auto", overflowX: "hidden" }}>
        {!collapsed && <div style={{ fontSize: 10, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, paddingLeft: 10 }}>Templates</div>}
        {TEMPLATES.map(t => (
          <button key={t.id} onClick={() => { setActive(t.id); setShowHistory(false); }}
            title={collapsed ? t.label : ""}
            style={{
              display: "flex", alignItems: "center", gap: collapsed ? 0 : 10, width: "100%",
              justifyContent: collapsed ? "center" : "flex-start",
              background: active === t.id && !showHistory ? "rgba(249,115,22,0.15)" : "transparent",
              border: "none", borderRadius: 9, padding: collapsed ? "10px 0" : "9px 10px", marginBottom: 3,
              cursor: "pointer", color: active === t.id && !showHistory ? "#fb923c" : "#888",
              fontSize: collapsed ? 20 : 13, fontFamily: "inherit", textAlign: "left", transition: "all 0.15s",
              borderLeft: active === t.id && !showHistory ? "2px solid #f97316" : "2px solid transparent"
            }}>
            <span style={{ fontSize: collapsed ? 20 : 16 }}>{t.icon}</span>
            {!collapsed && <span style={{ fontWeight: active === t.id && !showHistory ? 600 : 400, whiteSpace: "nowrap" }}>{t.label}</span>}
          </button>
        ))}

        <div style={{ margin: "16px 0 8px", borderTop: "1px solid #1e1e2e", paddingTop: 16 }}>
          {!collapsed && <div style={{ fontSize: 10, color: "#444", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, paddingLeft: 10 }}>Workspace</div>}
          <button onClick={() => setShowHistory(h => !h)} title={collapsed ? "History" : ""}
            style={{
              display: "flex", alignItems: "center", gap: collapsed ? 0 : 10, width: "100%",
              justifyContent: collapsed ? "center" : "flex-start",
              background: showHistory ? "rgba(239,68,68,0.12)" : "transparent",
              border: "none", borderRadius: 9, padding: collapsed ? "10px 0" : "9px 10px",
              cursor: "pointer", color: showHistory ? "#ef4444" : "#888",
              fontSize: collapsed ? 20 : 13, fontFamily: "inherit", textAlign: "left",
              borderLeft: showHistory ? "2px solid #ef4444" : "2px solid transparent"
            }}>
            <span style={{ fontSize: collapsed ? 20 : 16 }}>🕑</span>
            {!collapsed && "History"}
          </button>
        </div>
      </nav>

      {!collapsed && (
        <div style={{ padding: "16px", borderTop: "1px solid #1e1e2e" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(239,68,68,0.15))",
            border: "1px solid rgba(249,115,22,0.3)", borderRadius: 10, padding: "10px 14px"
          }}>
            <div style={{ fontSize: 11, color: "#fb923c", fontWeight: 700, letterSpacing: 0.5 }}>FREE PLAN</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>5 / 10 generations used</div>
            <div style={{ marginTop: 8, height: 3, background: "#1e1e2e", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: "50%", height: "100%", background: "linear-gradient(90deg, #f97316, #ef4444)", borderRadius: 4 }} />
            </div>
            <button style={{
              marginTop: 10, width: "100%", background: "linear-gradient(135deg, #f97316, #ef4444)",
              border: "none", borderRadius: 7, color: "#fff", fontSize: 12, fontWeight: 700,
              padding: "7px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 18px rgba(249,115,22,0.5)"
            }}>Upgrade to Pro ✦</button>
          </div>
        </div>
      )}
    </aside>
  );
}

function HistoryPanel({ history, onSelect }) {
  if (history.length === 0) return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#555", fontSize: 14 }}>
      No history yet. Generate some content!
    </div>
  );
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#f0f0ff", fontSize: 22, marginBottom: 20 }}>Content History</h2>
      {history.map((item, i) => (
        <div key={i} onClick={() => onSelect(item)}
          style={{
            background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 12,
            padding: "16px 18px", marginBottom: 12, cursor: "pointer",
            transition: "border-color 0.15s"
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#f97316"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e2e"}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: "#fb923c", fontSize: 12, fontWeight: 700 }}>{item.template} · {item.tone}</span>
            <span style={{ color: "#444", fontSize: 11 }}>{item.date}</span>
          </div>
          <div style={{ color: "#aaa", fontSize: 13, lineHeight: 1.5 }}>{item.topic}</div>
          <div style={{ color: "#666", fontSize: 12, marginTop: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.output?.slice(0, 120)}…</div>
        </div>
      ))}
    </div>
  );
}

function Generator({ template, onSave }) {
  const t = TEMPLATES.find(t => t.id === template);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [language, setLanguage] = useState("English");
  const [keywords, setKeywords] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setOutput("");

    const systemPrompt = `You are an expert copywriter and content strategist. Generate high-quality, engaging content based on user specifications. Always write in the requested language and tone. Be specific, compelling, and avoid generic filler.`;
    const userPrompt = `Create a ${t.label} with the following details:\nTopic/Product: ${topic}\nTone: ${tone}\nLanguage: ${language}\n${keywords ? `Keywords to include: ${keywords}` : ""}\n\nGenerate polished, ready-to-use content. Format it cleanly with appropriate sections if needed.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(c => c.text || "").join("") || "Something went wrong. Please try again.";
      setOutput(text);
      const historyItem = { template: t.label, tone, language, topic, output: text, date: new Date().toLocaleDateString() };
      saveHistory(historyItem);
      onSave();
    } catch (e) {
      setOutput("Error generating content. Please try again.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 36px", maxWidth: 860, margin: "0 auto", width: "100%" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 28 }}>{t.icon}</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#f0f0ff", margin: 0 }}>{t.label}</h1>
        </div>
        <p style={{ color: "#666", fontSize: 14, margin: 0 }}>{t.description}</p>
      </div>

      <div style={{ display: "grid", gap: 16, marginBottom: 20 }}>
        <div>
          <label style={{ display: "block", color: "#888", fontSize: 12, marginBottom: 7, letterSpacing: 0.5, textTransform: "uppercase" }}>Topic / Product / Brief</label>
          <textarea value={topic} onChange={e => setTopic(e.target.value)}
            placeholder={`e.g. "A productivity app that helps remote teams collaborate in real time"`}
            rows={3}
            style={{
              width: "100%", background: "#0f0f1a", border: "1px solid #1e1e2e",
              borderRadius: 10, color: "#e0e0ff", fontSize: 14, padding: "12px 14px",
              fontFamily: "inherit", resize: "vertical", outline: "none", boxSizing: "border-box",
              transition: "border-color 0.15s"
            }}
            onFocus={e => e.target.style.borderColor = "#f97316"}
            onBlur={e => e.target.style.borderColor = "#1e1e2e"}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: 12, marginBottom: 7, letterSpacing: 0.5, textTransform: "uppercase" }}>Tone & Style</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {TONES.map(t2 => (
                <button key={t2} onClick={() => setTone(t2)}
                  style={{
                    background: tone === t2 ? "rgba(249,115,22,0.2)" : "#0f0f1a",
                    border: tone === t2 ? "1px solid #f97316" : "1px solid #1e1e2e",
                    borderRadius: 7, color: tone === t2 ? "#fb923c" : "#666",
                    fontSize: 12, padding: "6px 12px", cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.15s"
                  }}>{t2}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: 12, marginBottom: 7, letterSpacing: 0.5, textTransform: "uppercase" }}>Language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)}
              style={{
                width: "100%", background: "#0f0f1a", border: "1px solid #1e1e2e",
                borderRadius: 10, color: "#e0e0ff", fontSize: 14, padding: "10px 14px",
                fontFamily: "inherit", outline: "none", cursor: "pointer"
              }}>
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: "block", color: "#888", fontSize: 12, marginBottom: 7, letterSpacing: 0.5, textTransform: "uppercase" }}>Keywords <span style={{ color: "#444" }}>(optional)</span></label>
          <input value={keywords} onChange={e => setKeywords(e.target.value)}
            placeholder="e.g. productivity, remote work, collaboration"
            style={{
              width: "100%", background: "#0f0f1a", border: "1px solid #1e1e2e",
              borderRadius: 10, color: "#e0e0ff", fontSize: 14, padding: "11px 14px",
              fontFamily: "inherit", outline: "none", boxSizing: "border-box",
              transition: "border-color 0.15s"
            }}
            onFocus={e => e.target.style.borderColor = "#f97316"}
            onBlur={e => e.target.style.borderColor = "#1e1e2e"}
          />
        </div>
      </div>

      <button onClick={generate} disabled={loading || !topic.trim()}
        style={{
          background: loading || !topic.trim() ? "#1e1e2e" : "linear-gradient(135deg, #f97316, #ef4444)",
          border: "none", borderRadius: 11, color: loading || !topic.trim() ? "#444" : "#fff",
          fontSize: 15, fontWeight: 700, padding: "14px 28px", cursor: loading || !topic.trim() ? "not-allowed" : "pointer",
          fontFamily: "inherit", letterSpacing: 0.3, transition: "all 0.2s",
          display: "flex", alignItems: "center", gap: 10, justifyContent: "center",
          boxShadow: loading || !topic.trim() ? "none" : "0 0 24px rgba(249,115,22,0.5)"
        }}>
        {loading ? (
          <><span style={{ display: "inline-block", animation: "spin 1s linear infinite", fontSize: 16 }}>⟳</span>Generating...</>
        ) : "✦ Generate Content"}
      </button>

      {output && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: "#888", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Generated Output</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={copy}
                style={{
                  background: copied ? "rgba(239,68,68,0.2)" : "#0f0f1a",
                  border: copied ? "1px solid #ef4444" : "1px solid #1e1e2e",
                  borderRadius: 8, color: copied ? "#ef4444" : "#888",
                  fontSize: 12, padding: "6px 14px", cursor: "pointer", fontFamily: "inherit"
                }}>{copied ? "✓ Copied!" : "Copy"}</button>
              <button onClick={generate}
                style={{
                  background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 8,
                  color: "#888", fontSize: 12, padding: "6px 14px", cursor: "pointer", fontFamily: "inherit"
                }}>Regenerate</button>
            </div>
          </div>
          <div ref={outputRef}
            style={{
              background: "#0a0a12", border: "1px solid #1e1e2e", borderRadius: 12,
              padding: "20px 22px", color: "#d0d0f0", fontSize: 14, lineHeight: 1.8,
              whiteSpace: "pre-wrap", fontFamily: "'Georgia', serif", maxHeight: 420, overflowY: "auto"
            }}>
            {output}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        textarea:focus, input:focus { outline: none; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #2a2a3e; border-radius: 4px; }
      `}</style>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("blog");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(getHistory());
  const [collapsed, setCollapsed] = useState(false);

  const refreshHistory = () => setHistory(getHistory());

  const handleHistorySelect = (item) => {
    setShowHistory(false);
    setActive(TEMPLATES.find(t => t.label === item.template)?.id || "blog");
  };

  const handleSetActive = (id) => {
    setActive(id);
    setShowHistory(false);
  };

  const sidebarWidth = collapsed ? 64 : 230;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#08080f", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
      <Sidebar
        active={active}
        setActive={handleSetActive}
        history={history}
        onHistorySelect={handleHistorySelect}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      />
      <main style={{ marginLeft: sidebarWidth, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh", transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)" }}>
        {showHistory
          ? <HistoryPanel history={history} onSelect={handleHistorySelect} />
          : <Generator template={active} onSave={refreshHistory} />
        }
      </main>
    </div>
  );
}
