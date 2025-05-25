import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TimerConfigurator.css";

const TimerConfigurator = () => {
  const [seconds, setSeconds] = useState("300");
  const [color, setColor] = useState("#ffffff");
  const [borderTop, setBorderTop] = useState("#ff00ff");
  const [borderBottom, setBorderBottom] = useState("#00ffff");
  const [borderTopTransparent, setBorderTopTransparent] = useState(false);
  const [borderBottomTransparent, setBorderBottomTransparent] = useState(false);
  const [style, setStyle] = useState("vortex");

  const navigate = useNavigate();

  const availableFonts = [
    { label: "Orbitron (Vortex)", value: "Orbitron" },
    { label: "UnifrakturCook (Viking)", value: "UnifrakturCook" },
    { label: "Patrick Hand (Kawaii)", value: "Patrick Hand" },
    { label: "Indie Flower (Chaton)", value: "Indie Flower" },
    { label: "Spectral SC (Lovecraft)", value: "Spectral SC" },
    { label: "Arial", value: "Arial" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
  ];

  const [font, setFont] = useState("Orbitron");

  const generateUrl = () => {
    const url = new URLSearchParams();
    url.set("color", color.replace("#", ""));
    url.set("style", style);
    url.set(
      "bordertop",
      borderTopTransparent ? "transparent" : borderTop.replace("#", "")
    );
    url.set(
      "borderbottom",
      borderBottomTransparent ? "transparent" : borderBottom.replace("#", "")
    );
    url.set("font", encodeURIComponent(font));
    url.set("decoration", decoration.toString());

    return `${window.location}/minuteur/${seconds}?${url.toString()}`;
  };

  const handleGenerate = () => {
    if (!seconds || isNaN(Number(seconds)) || Number(seconds) <= 0) return;
    navigate(generateUrl());
  };

  const [copied, setCopied] = useState(false);
  const [decoration, setDecoration] = useState(true);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}${generateUrl()}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div style={{ flex: 1 }}>
        <div className="configurator">
          <h1>🎛️ Minuteur Personnalisé</h1>

          <label>
            ⏱️ Durée (secondes)
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
          </label>

          <label>
            🎨 Couleur du texte
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>

          <label>
            ✍️ Police d’écriture
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              style={{ fontFamily: font }}
            >
              {availableFonts.map(({ label, value }) => (
                <option key={value} value={value} style={{ fontFamily: value }}>
                  {label}
                </option>
              ))}
            </select>
            <p style={{ fontFamily: font, fontSize: "1.2rem" }}>
              Aperçu : 12:34
            </p>
          </label>
          <label>
            🌟 Activer illustration animée
            <input
              type="checkbox"
              checked={decoration}
              onChange={() => setDecoration((prev) => !prev)}
            />
          </label>

          <label>
            🟪 Couleur bordure TOP
            <div className="color-line">
              <input
                type="color"
                value={borderTop}
                onChange={(e) => setBorderTop(e.target.value)}
                disabled={borderTopTransparent}
              />
              <label>
                <input
                  type="checkbox"
                  checked={borderTopTransparent}
                  onChange={() => setBorderTopTransparent((prev) => !prev)}
                />{" "}
                Transparent
              </label>
            </div>
          </label>

          <label>
            🟩 Couleur bordure BOTTOM
            <div className="color-line">
              <input
                type="color"
                value={borderBottom}
                onChange={(e) => setBorderBottom(e.target.value)}
                disabled={borderBottomTransparent}
              />
              <label>
                <input
                  type="checkbox"
                  checked={borderBottomTransparent}
                  onChange={() => setBorderBottomTransparent((prev) => !prev)}
                />{" "}
                Transparent
              </label>
            </div>
          </label>

          <label>
            🎭 Style visuel
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="vortex">Vortex</option>
              <option value="viking">Viking</option>
              <option value="kawaii">Kawaii</option>
              <option value="chaton">Chaton</option>
              <option value="lovecraft">Lovecraft</option>
            </select>
          </label>

          <button onClick={handleGenerate}>🚀 Visualiser le minuteur</button>

          <p
            className="generated-url"
            onClick={handleCopy}
            style={{ cursor: "pointer" }}
          >
            URL : <code>{generateUrl()}</code>
            {copied && (
              <span style={{ marginLeft: "1rem", color: "lime" }}>
                ✅ Copié !
              </span>
            )}
          </p>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <iframe
          src={generateUrl()}
          width="500"
          height="500"
          style={{ border: "2px solid #444", borderRadius: "12px" }}
        />
      </div>
    </div>
  );
};

export default TimerConfigurator;
