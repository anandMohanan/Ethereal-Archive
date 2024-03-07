import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    title: "Seamless Collaboration",
    description:
      "Collaborate effortlessly with your team members. Share files, leave comments, and track changes in real-time, all within our platform designed for effective teamwork.",
  },
  {
    title: "Secure File Uploads",
    description:
      "Experience peace of mind with our secure file upload feature. Your files are encrypted both in transit and at rest, ensuring maximum protection against unauthorized access.",
  },
  {
    title: "Streamlined User Experience",
    description:
      "Enjoy a hassle-free experience with our simplified interface. Navigate effortlessly, upload and download files with ease, ensuring productivity without unnecessary complexity.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center p-10">
        Simple yet {""}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          effective
        </span>
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description }: FeatureProps) => (
          <Card key={title} className="dark:bg-stone-900">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            {/* <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </section>
  );
};
