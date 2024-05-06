"use client";

import { useParams, useRouter, usePathname } from "next/navigation";

import { CreditCardIcon, DollarSign, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const params = useParams();
  const pathname = usePathname();

  const router = useRouter();

  const tabs = [
    {
      name: `balance`,
      icon: <CreditCardIcon className="h-6 w-6" />,
      active: pathname === `/${params.cardId}/balance`,
    },
    {
      name: `recharge`,
      icon: <DollarSign className="h-6 w-6" />,
      active: pathname === `/${params.cardId}/recharge`,
    },
    {
      name: `settings`,
      icon: <Settings className="h-6 w-6" />,
      active: pathname === `/${params.cardId}/settings`,
    },
  ];

  const onRedirect = (route: string) => {
    router.push(`/${params.cardId}/${route}`);
  };

  return (
    <div className="fixed bottom-0 flex items-center w-full p-6 bg-neutral-200 dark:bg-neutral-900 z-50">
      <ul
        role="tablist"
        className="w-full flex items-center text-muted-foreground justify-evenly"
      >
        {tabs.map((tab) => (
          <li key={tab.name} role="button">
            <div
              onClick={() => onRedirect(tab.name)}
              className={cn(
                "flex flex-col items-center",
                tab.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {tab.icon}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
