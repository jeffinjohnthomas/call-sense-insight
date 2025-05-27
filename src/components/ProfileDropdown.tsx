
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
  const userName = localStorage.getItem('userName') || 'User';
  
  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    toast({
      title: "Logged out successfully",
      description: "See you next time!",
    });
    
    navigate('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative rounded-full bg-gray-800/50 p-1 text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-56 bg-gray-800/95 backdrop-blur-xl border-gray-700/50 text-white" 
        align="end"
        sideOffset={5}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-xs text-gray-400">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-gray-700/50" />
        
        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50 cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700/50 cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-gray-700/50" />
        
        <DropdownMenuItem 
          className="text-red-400 hover:text-red-300 hover:bg-gray-700/50 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
