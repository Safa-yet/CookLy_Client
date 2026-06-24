import { FiMail, FiShield, FiCalendar, FiEdit2 } from "react-icons/fi";

import Link from "next/link";
import Image from "next/image";
import { getUserSession } from "@/lib/Reuseable/session";
import { getUserByEmail } from "@/lib/api/getUser";
import EditProfileModal from "@/component/Item/EditProfileModal";

export default async function ProfilePage() {
  const session = await getUserSession();

  const user = await getUserByEmail(session?.email);

  const isPremium = user?.plan === "user_premium";

  const isPro = user?.plan === "user_pro";

  return (
    <div className="min-h-screen bg-[#F4F6F8] pt-24 pb-10">
      <div className="max-w-6xl mx-auto px-5">
        {/* Top Card */}

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          {/* Cover */}

          <div className="h-48" />

          <div className="px-8 pb-8">
            {/* Profile Section */}

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
              <div className="-mt-16 flex flex-col lg:flex-row lg:items-end gap-6">
                {/* Avatar */}

                <div className="relative">
                  <div
                    className={`
                    w-32 h-32 rounded-full p-1 bg-white
                    ${
                      isPremium
                        ? "ring-4 ring-yellow-400"
                        : isPro
                          ? "ring-4 ring-green-500"
                          : "ring-4 ring-gray-200"
                    }
                  `}
                  >
                    <Image
                      src={user?.image}
                      alt={user?.name}
                      width={128}
                      height={128}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>

                  {isPremium && (
                    <div className="absolute bottom-0 right-0 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                      PREMIUM
                    </div>
                  )}

                  {isPro && (
                    <div className="absolute bottom-0 right-0 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      PRO
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-4xl font-bold text-[#091E21]">
                    {user?.name}
                  </h1>

                  <p className="text-gray-500 mt-2">{user?.email}</p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                      {user?.role}
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        user?.isBlocked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {user?.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </div>
              </div>
              <EditProfileModal user={user}></EditProfileModal>
            </div>
          </div>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <FiMail className="text-[#00B96D] text-xl" />

              <h3 className="font-semibold">Email</h3>
            </div>

            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <FiShield className="text-[#00B96D] text-xl" />

              <h3 className="font-semibold">Role</h3>
            </div>

            <p className="text-gray-600 capitalize">{user?.role}</p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <FiCalendar className="text-[#00B96D] text-xl" />

              <h3 className="font-semibold">Joined</h3>
            </div>

            <p className="text-gray-600">
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Plan Card */}

        <div className="mt-8">
          <div
            className={`
            rounded-[32px]
            p-8
            text-white
            ${
              isPremium
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : isPro
                  ? "bg-gradient-to-r from-[#00B96D] to-[#00995a]"
                  : "bg-gradient-to-r from-gray-700 to-gray-900"
            }
          `}
          >
            <h2 className="text-3xl font-bold">Current Subscription</h2>

            <p className="mt-3 text-white/80">Your current Cookly plan</p>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <h3 className="text-5xl font-bold">
                  {isPremium ? "Premium" : isPro ? "Pro" : "Free"}
                </h3>

                <p className="mt-2 text-white/80">
                  {isPremium
                    ? "Unlimited recipe posting"
                    : isPro
                      ? "10 recipes per month"
                      : "Basic plan"}
                </p>
              </div>

              <Link href="/plans">
                <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold">
                  Upgrade Plan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
