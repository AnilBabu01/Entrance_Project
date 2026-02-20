import { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../../public/assets/logo.svg";
import profile from "../../../public/assets/profile.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BASE_URL, ORIGINAL_BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "@/context/authContext";

interface Course {
  id: string;
  course_name: string;
}

const Index = () => {
  const router = useRouter();
  const routeName = router.pathname;
  const { refetchUser, user } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isOpenNotedMenu, setisOpenNotedMenu] = useState(false);
  const [isOpenEntrance, setisOpenEntrance] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setisOpenNotedMenu(false);
    setisOpenEntrance(false);
  };

  const toggleNotesMenu = () => {
    setisOpenNotedMenu(!isOpenNotedMenu);
    setisOpenEntrance(false);
    setIsProfileMenuOpen(false);
  };

  const toggleEntranceMenu = () => {
    setisOpenEntrance(!isOpenEntrance);
    setisOpenNotedMenu(false);
    setIsProfileMenuOpen(false);
  };

  const { data } = useQuery({
    queryKey: ["getCourse"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-course`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  const logout = () => {
    router.push("/signin");
    localStorage.removeItem("studyItToken");
    refetchUser();
  };

  const { courseid } = router.query;

  return (
    <nav
      className={`bg-[#fff]  shadow-lg  pt-4 pb-4 px-4 w-full top-0 md:pl-28 md:pr-28 ${
        isScrolled ? "fixed top-0 z-50" : "relative"
      }`}
    >
      <div className="mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <Image src={Logo} height={200} width={150} alt="logo" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={
                routeName === "/" ? "ativeLink text-[black]" : "text-[black]"
              }
            >
              Home
            </Link>
            <div className="relative ml-11">
              <button
                onClick={() => {
                  if (user) {
                    toggleEntranceMenu();
                  } else {
                    router.push("/signin");
                  }
                }}
                className={
                  routeName === "/entrance-preparation"
                    ? "ativeLink text-[black]"
                    : "text-[black]"
                }
              >
                Entrance Preparation
              </button>
              {isOpenEntrance && (
                <div className="absolute mt-[1.5rem]  w-[15rem] bg-white z-10">
                  {Array.isArray(data?.data) &&
                    data?.data.map((item: Course, index: number) => {
                      const itemId = Number(item?.id);
                      const courseIdNumber = Number(courseid);

                      return (
                        <Link
                          key={index}
                          onClick={() => toggleEntranceMenu()}
                          href={`/entrance-preparation/${itemId}`}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-[#D1F1FF] ${
                            courseIdNumber === itemId ? "bg-[#D1F1FF]" : ""
                          }`}
                        >
                          {item?.course_name}
                        </Link>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="relative ml-11">
              <button
                onClick={() => toggleNotesMenu()}
                className={
                  routeName === "/course-notes"
                    ? "ativeLink text-[black]"
                    : "text-[black]"
                }
              >
                Notes
              </button>

              {isOpenNotedMenu && (
                <div className="absolute left-0 top-full mt-[1.4rem] w-[15rem] bg-white z-50">
                  {Array.isArray(data?.data) &&
                    data?.data.map((item: Course, index: number) => {
                      const itemId = Number(item?.id);
                      const courseIdNumber = Number(courseid);

                      return (
                        <Link
                          key={index}
                          onClick={() => toggleNotesMenu()}
                          href={`/notes/${itemId}`}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-[#D1F1FF] ${
                            courseIdNumber === itemId ? "bg-[#D1F1FF]" : ""
                          }`}
                        >
                          {item?.course_name}
                        </Link>
                      );
                    })}
                </div>
              )}
            </div>

            <Link
              href="/blogs"
              className={
                routeName === "/blogs"
                  ? "ativeLink text-[black]"
                  : "text-[black]"
              }
            >
              Blog
            </Link>
            <Link
              href="/about-us"
              className={
                routeName === "/about-us"
                  ? "ativeLink text-[black]"
                  : "text-[black]"
              }
            >
              About Us
            </Link>
          </div>
          <div className="relative ml-11">
            <button
              onClick={() => toggleProfileMenu()}
              className="flex items-center focus:outline-none"
            >
              <Image
                src={
                  user && user?.profileUrl
                    ? `${ORIGINAL_BASE_URL}${user?.profileUrl}`
                    : profile
                }
                height={35}
                width={35}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </button>
            {isProfileMenuOpen && (
              <div
                id="profile-menu"
                className="absolute right-0 mt-[1rem]  w-28 bg-white   z-10"
              >
                {user ? (
                  <>
                    <Link
                      href="/my-profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#D1F1FF] "
                    >
                      My Profile
                    </Link>
                    <Link
                      onClick={() => logout()}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#D1F1FF] hover:rounded-b-lg"
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#D1F1FF]    "
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#D1F1FF] "
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            <FaBars size={24} color="black" />
          </button>
        </div>
      </div>
      <div
        className={`dark-mobile fixed top-0 shadow-lg right-0 bg-[#fff] text-white w-[60%] h-screen transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out z-20`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center">
            <FaTimes onClick={toggleMenu} size={24} color="black" />
          </div>
          <Link
            href="/"
            className={
              routeName === "/"
                ? "activeLink block py-2 text-[black]"
                : "link block py-2 text-[black]"
            }
          >
            Home
          </Link>
          <Link
            href="/entrance-preparation"
            className={
              routeName === "/entrance-preparation"
                ? "activeLink block py-2 text-[black]"
                : "link block py-2 text-[black]"
            }
          >
            Entrance Preparation
          </Link>
          <Link
            href="/course-notes"
            className={
              routeName === "/course-notes"
                ? "activeLink block py-2 text-[black]"
                : "link block py-2 text-[black]"
            }
          >
            Course Notes
          </Link>
          <Link
            href="/blog"
            className={
              routeName === "/blog"
                ? "activeLink block py-2 text-[black]"
                : "link block py-2 text-[black]"
            }
          >
            Blog
          </Link>
          <Link
            href="/about-us"
            className={
              routeName === "/about-us"
                ? "activeLink block py-2 text-[black]"
                : "link block py-2 text-[black]"
            }
          >
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Index;
