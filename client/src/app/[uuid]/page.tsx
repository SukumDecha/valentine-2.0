import Choose from "@/components/Choose/Choose";

interface PageProps {
  params: {
    uuid: string
  }
}

const CameraPage = ({ params }: PageProps) => {
  const uuid = params.uuid;
  return (
    <>
      <Choose uuid={uuid} />
    </>
  );
};

export default CameraPage;