import { type GetServerSideProps, GetServerSidePropsContext } from "next";

export default function Daftar() {
  return <div></div>;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  return {
    props: {},
  };
};
