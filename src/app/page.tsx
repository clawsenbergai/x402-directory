import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">x402.directory</span>
            <Badge variant="secondary">Beta</Badge>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost">Browse</Button>
            <Button variant="ghost">Submit</Button>
            <Button>Connect Wallet</Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Discover x402-Enabled APIs
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            The trusted discovery platform for x402-enabled APIs. Real-time
            health monitoring, pricing intelligence, and trust signals — making
            it easy for agents and developers to find reliable paid services.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg">Browse Services</Button>
            <Button size="lg" variant="outline">
              Submit Your API
            </Button>
          </div>
        </section>

        <section className="border-t bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-semibold">
              Featured Services
            </h2>
            <p className="text-center text-muted-foreground">
              Coming soon — browse x402-enabled APIs with health monitoring and
              pricing info.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Find. Trust. Pay. Use.</p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} x402.directory
          </p>
        </div>
      </footer>
    </div>
  );
}
