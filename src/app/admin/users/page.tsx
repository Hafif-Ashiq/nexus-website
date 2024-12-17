"use client"
import React, { useEffect, useState } from 'react'
import GraphInfo from '../_components/GraphInfo'
import LargeButton from '../_components/LargeButton'
import UsersList from '../_components/UsersList'
import { listenToUsersList } from '@/firebaseFunctions/admin/users'
import { UserProfile } from '@/services/UserInterface'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setAllUsersList, setCurrentUser } from '@/redux/slices/adminSlice'
import { mockUser } from '@/constants/data'
import { SupportInterface } from '@/services/SupportInterface'

const Page = () => {

    const dispatch = useDispatch()

    const allUsersList = useSelector((state: RootState) => state.adminReducer.allUsersList)
    const allSupportChats = useSelector((state: RootState) => state.adminReducer.allSupportChats)
    const currentUser = useSelector((state: RootState) => state.adminReducer.currentUser)

    const [activeTile, setActiveTile] = useState(0)

    // Calculate statistics from allUsersList and support chats
    const calculateUserStats = () => {
        const activeUsers = allUsersList.filter(user => !user.account_status.is_deactivated).length
        const premiumUsers = allUsersList.filter(user => user.account_status.is_premium).length

        // Get issues by day for the last 7 days
        const last7Days = new Date()
        last7Days.setDate(last7Days.getDate() - 7)

        const recentIssues = allSupportChats.filter(chat =>
            new Date(chat.issue_opened_time) >= last7Days
        )

        const issuesReported = allSupportChats.length

        // Group issues by day
        const issuesByDay = Array(7).fill(0)
        recentIssues.forEach(issue => {
            const dayIndex = new Date(issue.issue_opened_time).getDay()
            issuesByDay[dayIndex]++
        })

        return {
            activeUsers,
            premiumUsers,
            issuesReported,
            issuesByDay
        }
    }

    // Group users by day of week for the graph data
    const getUsersActivityData = () => {
        const last7Days = Array(7).fill(0)

        allUsersList.forEach(user => {
            const dayIndex = new Date(user.start_date).getDay()
            last7Days[dayIndex]++
        })

        return last7Days
    }

    const stats = calculateUserStats()
    const activityData = getUsersActivityData()

    const tiles = [
        {
            title: "Active Users",
            value: `${stats.activeUsers}`,
            activeSvg: "users-white",
            inActiveSvg: "users-blue",
            increase: true,
            change: "5.4%", // You might want to calculate this based on historical data
            data: {
                labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                datasets: [{
                    label: '',
                    data: activityData,
                    borderColor: '#2A4E8F',
                    backgroundColor: '#93AAFD30',
                    fill: true
                }],
            }
        },
        {
            title: "Premium Users",
            value: `${stats.premiumUsers}`,
            activeSvg: "users-white",
            inActiveSvg: "users-blue",
            increase: true,
            change: "2.14%",
            data: {
                labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                datasets: [{
                    label: '',
                    data: activityData.map(val => val * 0.3), // Example: 30% of active users are premium
                    borderColor: '#2A4E8F',
                    backgroundColor: '#93AAFD30',
                    fill: true
                }],
            }
        },
        {
            title: "Issues Reported",
            value: `${stats.issuesReported}`,
            activeSvg: "issues-white",
            inActiveSvg: "issues-blue",
            increase: false,
            change: "1.24%",
            data: {
                labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
                datasets: [{
                    label: '',
                    data: stats.issuesByDay,
                    borderColor: '#2A4E8F',
                    backgroundColor: '#93AAFD30',
                    fill: true
                }],
            }
        },
    ]

    useEffect(() => {
        let unsubscribeUsers = listenToUsersList((result) => {
            console.log(result);
            dispatch(setAllUsersList(result))
        });

        return () => unsubscribeUsers();

    }, [])
    useEffect(() => {
        if (allUsersList.length == 0) {
            return
        }

        if (mockUser.user_id == currentUser.user_id) {

            dispatch(setCurrentUser(allUsersList[0]));
        }
        else {
            const newSupport = allUsersList.find(user => user.user_id == currentUser.user_id)
            dispatch(setCurrentUser(newSupport));
        }
    }, [allUsersList])


    return (

        <div className="flex flex-col gap-[30px] flex-1 ">

            <div className='basis-[75%] flex flex-col gap-[20px]'>
                <div className='flex justify-between items-center gap-[20px]'>
                    {tiles.map((stat, index) => (
                        <LargeButton
                            key={index}
                            activeIcon={stat.activeSvg}
                            inActiveIcon={stat.inActiveSvg}
                            text={stat.value}
                            title={stat.title}
                            increase={stat.increase}
                            change={stat.change}
                            onClick={() => setActiveTile(index)}
                            active={index == activeTile}
                        />
                    ))}
                </div>
                <GraphInfo data={tiles[activeTile].data} title={tiles[activeTile].title} value={tiles[activeTile].value} change={tiles[activeTile].change} increase={tiles[activeTile].increase} />
                <UsersList users={allUsersList.slice(0, 2)} clickEnabled />

            </div>

        </div>
    )
}

export default Page