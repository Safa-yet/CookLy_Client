"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Button,
  Avatar,
  Dropdown,
  Drawer,
} from "@heroui/react";

import {
  FiMenu,
  FiHome,
  FiBookOpen,
  FiLayout,
  FiUser,
  FiLogIn,
  FiUserPlus,
  FiLogOut,
  FiMoon,
} from "react-icons/fi";
import ThemeSwitch from "../Items/ThemeSwitch";
import Image from "next/image";

import whiteLogo from "../../img/Logo_White.png";
import DarkLogo from "../../img/Logo_Black.png"

export default function Navbar() {
  // TODO:
  // const { data: session } = authClient.useSession();

  const session = null;

  const user = session?.user;

  const role = user?.role;

  const dashboardRoute = {
    user: "/dashboard",
    admin: "/dashboard/admin",
  };

  const navLinks = [
    {
      label: "Home",
      href: "/",
      icon: <FiHome />,
    },
    {
      label: "Browse Recipes",
      href: "/recipes",
      icon: <FiBookOpen />,
    },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 border-b border-default-200 bg-background"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 max-w-28"
        >
        <Image
        src={whiteLogo}
        alt="logo" width={500}
        ></Image>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-medium text-default-600 transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          {user && (
            <Link
              href={
                dashboardRoute[role] ||
                "/dashboard"
              }
              className="font-medium text-default-600 transition hover:text-primary"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Theme Toggle */}

           <ThemeSwitch />

          {!user ? (
            <>
            <Link
              href="/auth/signin"
            >

              <Button
                variant="light"
              >
                <FiLogIn />
                Login
              </Button>
            </Link>

<Link href="/auth/signup">
              <Button
              >
                <FiUserPlus />
                Register
              </Button>
</Link>

            </>
          ) : (
            <Dropdown>
              <Dropdown.Trigger>
                <button>
                  <Avatar>
                    <Avatar.Image
                      src={user?.image}
                      alt={user?.name}
                    />

                    <Avatar.Fallback>
                      {user?.name?.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                </button>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Item>
                    My Recipes
                  </Dropdown.Item>

                  <Dropdown.Item>
                    Favorites
                  </Dropdown.Item>

                  <Dropdown.Item>
                    Purchased Recipes
                  </Dropdown.Item>

                  <Dropdown.Item>
                    Dashboard
                  </Dropdown.Item>

                  <Dropdown.Item>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Drawer>
            <Drawer.Trigger>
              <Button
                isIconOnly
                variant="light"
              >
                <FiMenu size={22} />
              </Button>
            </Drawer.Trigger>

            <Drawer.Backdrop>
              <Drawer.Content>
                <Drawer.Dialog>
                  <Drawer.CloseTrigger />

                  <Drawer.Header>
                    <Drawer.Heading>
                      Menu
                    </Drawer.Heading>
                  </Drawer.Header>

                  <Drawer.Body>
                    <div className="flex flex-col gap-4">
                      {navLinks.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-2 rounded-xl p-3 hover:bg-default-100"
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      ))}

                      {user && (
                        <Link
                          href={
                            dashboardRoute[
                              role
                            ] ||
                            "/dashboard"
                          }
                          className="flex items-center gap-2 rounded-xl p-3 hover:bg-default-100"
                        >
                          <FiLayout />
                          Dashboard
                        </Link>
                      )}
                    </div>
                  </Drawer.Body>

                  <Drawer.Footer>
                    {!user ? (
                      <div className="flex w-full flex-col gap-3">
                        <Link href="/auth/signin">
                          <Button
                            variant="bordered"
                            className="w-full"
                          >
                            Login
                          </Button>
                        </Link>
                        <Link href="/auth/signup">
                          <Button
                            variant="bordered"
                            className="w-full"
                          >
                            Register
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex w-full flex-col gap-3">
                        <Button
                          variant="bordered"
                          className="w-full"
                        >
                          <FiUser />
                          Profile
                        </Button>

                        <Button
                          color="danger"
                          className="w-full"
                        >
                          <FiLogOut />
                          Logout
                        </Button>
                      </div>
                    )}
                  </Drawer.Footer>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>
      </div>
    </motion.header>
  );
}