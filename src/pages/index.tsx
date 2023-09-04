import type { NextPage } from 'next'
import Head from 'next/head'
import {Home} from '@/components/screens/Home/Home'
import {Layout} from '@/components/Layout/Layout'
import React from "react";

const Index: NextPage = () => {
  return (
      <>
          <Head>
              <title>Stoodo - Home</title>
          </Head>
          <Layout>
              <Home/>
          </Layout>
      </>
  )
}
export default Index;

