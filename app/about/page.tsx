import Link from 'next/link'
import Card from '../../components/ui/Card'

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto p-4 py-12 space-y-8">
      <section className="text-center space-y-4 animate-fade-up">
        <h1 className="text-4xl md:text-5xl font-extrabold">About Beelionaire 🐝</h1>
        <p className="text-lg muted max-w-2xl mx-auto">
          A fun, competitive quiz and rewards platform where knowledge pays off
        </p>
      </section>

      <Card className="animate-pop">
        <h2 className="text-2xl font-bold mb-4">What is Beelionaire?</h2>
        <p className="muted leading-relaxed mb-4">
          Beelionaire is an interactive quiz platform where you can test your knowledge, 
          complete tasks, and earn real rewards. Whether you're a trivia enthusiast or 
          just looking for a fun way to learn, Beelionaire makes it exciting and rewarding.
        </p>
        <p className="muted leading-relaxed">
          Join thousands of players competing on the leaderboard, answer questions across 
          various categories, and redeem your points for cash and prizes!
        </p>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="animate-pop">
          <div className="text-3xl mb-2">🎯</div>
          <h3 className="font-bold mb-2">Play Quiz</h3>
          <p className="text-sm muted">Answer questions and earn points for every correct answer</p>
        </Card>

        <Card className="animate-pop">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-bold mb-2">Complete Tasks</h3>
          <p className="text-sm muted">Earn bonus points by completing social tasks and challenges</p>
        </Card>

        <Card className="animate-pop">
          <div className="text-3xl mb-2">💰</div>
          <h3 className="font-bold mb-2">Cash Out</h3>
          <p className="text-sm muted">Redeem your points for real money via bank or mobile money</p>
        </Card>
      </div>

      <Card className="animate-pop">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ol className="space-y-3 muted">
          <li className="flex gap-3">
            <span className="badge badge-bee flex-shrink-0">1</span>
            <span><strong>Sign Up:</strong> Create your free account in seconds</span>
          </li>
          <li className="flex gap-3">
            <span className="badge badge-bee flex-shrink-0">2</span>
            <span><strong>Play Quiz:</strong> Answer questions and earn points for correct answers</span>
          </li>
          <li className="flex gap-3">
            <span className="badge badge-bee flex-shrink-0">3</span>
            <span><strong>Complete Tasks:</strong> Follow us on social media, refer friends, and earn more</span>
          </li>
          <li className="flex gap-3">
            <span className="badge badge-bee flex-shrink-0">4</span>
            <span><strong>Cash Out:</strong> Redeem your points once you reach the minimum threshold</span>
          </li>
        </ol>
      </Card>

      <div className="text-center space-y-4 animate-pop">
        <h2 className="text-2xl font-bold">Ready to Start Earning?</h2>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/register" className="btn btn-primary">
            Sign Up Free
          </Link>
          <Link href="/auth/login" className="btn btn-duo">
            Login
          </Link>
        </div>
      </div>
    </main>
  )
}
