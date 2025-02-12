import Choose from "@/components/Choose/Choose";

interface PageProps {
  params: {
    uuid: string
  }
}

const CameraPage = ({ params }: PageProps) => {
  return (
    <>
      <Choose uuid={params.uuid} />
    </>
  );
};

export default CameraPage;