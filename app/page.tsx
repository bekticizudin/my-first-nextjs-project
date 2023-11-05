"use client"
import Image from 'next/image'
import { UserProvider } from './components/UserContext'
import SearchByCity from './components/SearchByCity'
import UserTable from './components/UserTable'
import Pagination from './components/Pagination'

export default function Home() {
  return (
    <UserProvider>
    <SearchByCity />
    <UserTable />
    <Pagination />
  </UserProvider>
  )
}
