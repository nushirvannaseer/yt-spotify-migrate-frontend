"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSession } from "../types/user";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "../lib/api/logout";

function Header({ user }: { user: UserSession }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <div className="flex justify-between bg-gradient-to-r from-zinc-900 to-zinc-950 items-center p-2 border-b-[0.25px] border-zinc-800">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <span className="p-4 font-bold text-xl hover:bg-none text-zinc-300 ">
                  Movezic
                </span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-2 mr-4">
        <span className="text-sm font-medium leading-none ">
          {user.current_user.name}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar
              onClick={() => setIsOpen(!isOpen)}
              className="relative cursor-pointer"
            >
              <AvatarImage
                className="w-10 h-10 rounded-full"
                src={user.current_user.image}
              />
              <AvatarFallback>
                {user.current_user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-20 border-0 bg-primary rounded-lg">
            <DropdownMenuGroup className=" rounded-lg">
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  window.location.reload();
                }}
                className="cursor-pointer hover:!bg-popover-foreground"
              >
                <span className="text-white">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
