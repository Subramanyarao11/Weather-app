'use client';
import { BarChart4 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './ModeToggle';
import { authContext } from '@/lib/store/auth-context';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

function NavBar() {
  const { user, logout, loading, googleLoginHandler } = useContext(authContext);
  const router = useRouter();
  const handleLogin = async () => {
    await googleLoginHandler();
    router.refresh();
  };

  return (
    <header className="container max-w-2xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {!loading && (
          <>
            {/* Left side - User greeting or Welcome message */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  {/* Avatar */}
                  <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                    <Avatar>
                      <AvatarImage referrerPolicy="no-referrer" src={user.photoURL as string} />
                      <AvatarFallback>{user.displayName}</AvatarFallback>
                    </Avatar>
                  </div>
                  {/* User greeting */}
                  <small>Hi {user.displayName}!</small>
                </>
              ) : (
                // Welcome message when not logged in
                <small>Welcome</small>
              )}
            </div>

            {/* Right side of the navigation */}
            <nav className="flex items-center gap-4">
              {user && (
                // Show BarChart only if user is logged in
                <div>
                  <BarChart4 className="text-2xl cursor-pointer" />
                </div>
              )}
              <div>
                <ModeToggle />
              </div>
              {user ? (
                // Logout button for logged-in users
                <div>
                  <Button onClick={logout} variant="destructive">
                    Log out
                  </Button>
                </div>
              ) : (
                // Login button for guests
                <div>
                  <Button onClick={handleLogin} variant="default">
                    Log in
                  </Button>
                </div>
              )}
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
