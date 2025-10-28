export default function ChatPage() {
  return (
    <div className="flex min-h-screen bg-red-50 font-sans dark:bg-black">
        <ul>
            <li><a href="http://localhost:3000/dashboard">Dashboard</a></li>
            <li><a href="http://localhost:3000/chat">Chat</a></li>
            <li><a href="http://localhost:3000/">Home</a></li>
            <li><a href="http://localhost:3000/login">Login</a></li>
            <li><a href="http://localhost:3000/sign-up">Sign Up</a></li>
            
        </ul>
    </div>
  );
}