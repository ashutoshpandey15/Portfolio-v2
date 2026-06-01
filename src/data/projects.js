export const projects = [
  {
    title: "TruthLens",
    description:
      "Developed and deployed TruthLens, a DeepFake detection system using MesoNet CNN with 90% real-time accuracy, enhanced by 15% via OpenCV-based image processing. Built a balanced 8,000+ image dataset using generative AI and integrated a Gradio interface for seamless, real-time detection.",
    tech: ["Python", "Gradio", "OpenCV", "CNN", "MesoNet"],
    image: "assets/images/work/deepfake.png",
    imageAlt: "TruthLens deepfake detection",
    links: [
      {
        label: "Explore this project",
        href: "https://github.com/ashutoshpandey15/DeepFake_Image_Detection",
      },
      {
        label: "Research Paper",
        href: "https://ijsrem.com/download/deepfake-image-detection/",
      },
    ],
    source: "https://github.com/ashutoshpandey15/DeepFake_Image_Detection",
  },
  {
    title: "Potato AI",
    description:
      "Developed Potato AI, a plant disease classifier achieving 94% accuracy and high precision across multiple crop disease types using a custom CNN trained on real-world agricultural data. Integrated a ReactJS frontend with a FastAPI backend for real-time predictions, and reached the semi-finals in the VOIS Innovation Marathon 2022, selected from over 20 teams.",
    tech: [
      "TensorFlow",
      "FastAPI",
      "ReactJS",
      "Python",
      "CNN Classification",
      "OpenCV",
      "Matplotlib",
    ],
    image: "assets/images/work/potato.png",
    imageAlt: "Potato AI plant disease classifier",
    links: [
      {
        label: "Explore this project",
        href: "https://github.com/ashutoshpandey15/potato-disease-classification",
      },
    ],
    source: "https://github.com/ashutoshpandey15/potato-disease-classification",
  },
  {
    title: "Simple 2048 Game",
    description:
      "Developed a browser-based 2048 game with a responsive JavaScript UI, Dockerized into a compact 120MB image for portable deployments. Deployed on AWS Elastic Beanstalk achieving 99.9% uptime with auto-scaling, and configured nginx to reduce page load times to under 1.2 seconds.",
    tech: ["JavaScript", "aws", "nginx", "Docker"],
    image: "assets/images/work/2048-game.png",
    imageAlt: "2048 game",
    links: [{ label: "Explore this project", href: "#" }],
    source: "#",
  },
];
