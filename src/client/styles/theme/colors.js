const pallet = {
  light: {
    Primary: "#000",
    Secondary: "#FFF",
    StaticBlack: "#000",
    StaticWhite: "#FFF",
    Neutral: "rgba(0, 0, 0, 0.2)",
    Carousel: "#FFF",
    BlueGradient: "linear-gradient(45deg, #05abe0 0%, #8200f4 100%)",
    GreenGradient: "#020202",
  },
  dark: {
    Primary: "#FFF",
    Secondary: "#000",
    StaticBlack: "#000",
    StaticWhite: "#FFF",
    Neutral: "rgba(255, 255, 255, 0.2)",
    Carousel: "#17141d",
    BlueGradient: "linear-gradient(45deg, #05abe0 0%, #8200f4 100%)",
    GreenGradient: "hsla(218, 100%, 26%, 1)",
  },
};

export default function colors(color) {
  const params = new URL(window.location.href).searchParams;
  return params.get("mode")
    ? pallet[params.get("mode")][color]
    : pallet["light"][color];
}
