export default function Card({ title, variant = "default" }) {
  const typeVariant = (variants) => {
    switch (variants) {
      case "winners":
        "border-green-500 text-green-800  font-semibold";
      default:
        "broder-primary";
    }
  };
  return (
    <div className={`px-9 p-4 border rounded text-6xl ${typeVariant(variant)}`}>
      {title}
    </div>
  );
}
