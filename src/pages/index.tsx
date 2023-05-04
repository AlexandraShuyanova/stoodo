import type { NextPage } from 'next'
import Link from "next/link";
import {Home} from '@/components/screens/Home/Home'
import {Layout} from '@/components/Layout/Layout'

const Index: NextPage = () => {
  return (
    <Layout>
        <Home/>
    </Layout>
  )
}
export default Index;

