import { useEffect } from "react";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import {  getUserStats } from "../../store/slices/user.slice";
import {
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

const Dashboard = () => {
  const { totalActiveUsers, totalInActiveUsers, totalStatsUsers } = useAppSeletor((state) => state.user);
  const dispatch = useAppDispatch();
  console.log(totalActiveUsers)


  useEffect(() => {
    dispatch(getUserStats());
  }, [dispatch]);

  const stats = [
    {
      title: "Total Users",
      value: totalStatsUsers,
      icon: Users,
    },
    {
      title: "Active Users",
      value: totalActiveUsers,
      icon: UserCheck,
    },
    {
      title: "Inactive Users",
      value: totalInActiveUsers,
      icon: UserX,
    },
  ];

  return (
    <div className="w-full p-6">
      <div className="flex w-full flex-col gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                group w-full
                rounded-2xl
                border border-purple-700
                bg-purple-50
                p-6
                shadow-lg
                transition-all duration-300 ease-in-out
                hover:-translate-y-1
                hover:border-purple-500
                hover:shadow-2xl
              "
            >
              <div className="flex items-center justify-between">
                {/* Text */}
                <div>
                  <p className="text-lg font-bold text-slate-700">
                    {stat.title}
                  </p>

                  <h2
                    className="
                      mt-2 text-3xl font-bold text-purple-900
                      transition-transform duration-300
                      group-hover:scale-105
                    "
                  >
                    {stat.value}
                  </h2>
                </div>

                {/* Icon */}
                <div
                  className="
                    flex h-14 w-14 items-center justify-center
                    rounded-xl
                    bg-purple-800
                    text-gray-300
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:bg-purple-700
                    group-hover:text-white
                  "
                >
                  <Icon size={28} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;