export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "var(--color-black)" }} className="mt-8 border-t border-[rgba(255,255,255,0.06)] py-6">
      <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-sm text-muted">© {year} Red Devils BCN</div>
        <div className="text-sm text-muted">
          Made by <a href="https://www.graemebyrne.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Graeme Byrne</a>
        </div>
      </div>
    </footer>
  );
}
