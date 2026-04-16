import "./RouteFallback.css";

// Tiny full-page placeholder shown while a lazy route's chunk is loading.
// Designed to match the cyber theme so the swap feels intentional.
export default function RouteFallback() {
  return (
    <div className="rf" role="status" aria-live="polite" aria-busy="true">
      <div className="rf__box">
        <span className="rf__prompt">$</span>
        <span className="rf__text">loading module</span>
        <span className="rf__dots">
          <span />
          <span />
          <span />
        </span>
      </div>
      <span className="rf__sr">Loading the page, please wait.</span>
    </div>
  );
}
