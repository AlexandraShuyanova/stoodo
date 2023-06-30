import type { NextPage } from 'next'
import Link from "next/link";
import {Home} from '@/components/screens/Home/Home'
import {Layout} from '@/components/Layout/Layout'
import {ModalWindow} from "@/components/UI/ModalWindow/ModalWindow";
import {Button} from "@/components/UI/Button/Button";
import styles from "@/components/UI/ModalWindow/ModalWindow.module.scss";
import {TextField} from "@/components/UI/TextField/TextField";
import React from "react";
import {AuthForm} from "@/components/Header/components/AuthForm/AuthForm";

const Index: NextPage = () => {
  return (
      <div>

          <Layout>
              <Home/>
          </Layout>
      </div>

  )
}
export default Index;

