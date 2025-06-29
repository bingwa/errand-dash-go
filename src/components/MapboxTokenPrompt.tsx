
import { useState, useEffect } from "react";

const MapboxTokenPrompt = ({ onToken }: { onToken: (token: string) => void }) => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const existingToken = localStorage.getItem("mapbox_token");
    if (existingToken && existingToken.startsWith("pk.")) {
      onToken(existingToken);
      return;
    }
    setIsLoading(false);
  }, [onToken]);

  if (isLoading) {
    return (
      <div className="bg-background border rounded-lg shadow-lg max-w-lg mx-auto mt-10 p-8 text-center animate-fade-in">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="bg-background border rounded-lg shadow-lg max-w-lg mx-auto mt-10 p-8 text-center animate-fade-in">
      <h3 className="font-bold text-2xl mb-2">Mapbox Map Access Token Required</h3>
      <p className="text-muted-foreground mb-4 text-sm">
        Please enter your <span className="font-semibold">Mapbox public access token</span>
        {" (available at "}<a target="_blank" href="https://account.mapbox.com/access-tokens/" className="text-primary underline">mapbox.com</a>).
      </p>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!token.startsWith("pk.")) {
            setError("Token must start with pk.");
            return;
          }
          localStorage.setItem("mapbox_token", token);
          setError("");
          onToken(token);
        }}
        className="flex flex-col gap-3 w-full"
      >
        <input
          autoFocus
          className="border px-4 py-2 rounded w-full"
          placeholder="pk.eyJ1Ijo..."
          value={token}
          onChange={e => setToken(e.target.value)}
        />
        <button
          className="bg-primary text-primary-foreground rounded py-2 font-medium hover:bg-primary/90 transition"
          type="submit"
        >
          Save Token & Show Map
        </button>
        {error && <span className="text-destructive text-sm animate-shake">{error}</span>}
      </form>
    </div>
  );
};

export default MapboxTokenPrompt;
