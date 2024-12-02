import {
  Typography,
  IconButton,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubscribe = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setSuccessMessage("Будь ласка, введіть вашу електронну адресу.");
      return;
    }

    if (!emailRegex.test(email)) {
      setSuccessMessage("Будь ласка, введіть дійсну електронну адресу.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося підписатися. Будь ласка, спробуйте пізніше.");
      }

      setEmail("");
      setSuccessMessage("Дякуємо, що приєднались до нас!");
    } catch (error) {
      console.error(error);
      setSuccessMessage("Упс, щось пішло не так. Спробуйте ще раз.");
    }
  };


  return (
    <footer className="pb-5 p-10 md:pt-10">
      <div className="container flex flex-col mx-auto">
        <div className="flex !w-full py-10 mb-5 md:mb-20 flex-col justify-center !items-center bg-gray-900 container max-w-6xl mx-auto rounded-2xl p-5">
          <Typography
            className="text-2xl md:text-3xl text-center font-bold"
            color="white"
          >
            Приєднуйтесь на нашої спільноти!
          </Typography>
          <Typography
            color="white"
            className="md:w-7/12 text-center my-3 !text-base"
          >
            Отримуйте сповіщення про нові благодійні події та збори. Зробіть свою
            участь ще більш активною!
          </Typography>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
            <div className="w-80">
              <Input
                label="Електронна адреса"
                color="white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              size="md"
              className="lg:w-32"
              fullWidth
              color="white"
              onClick={handleSubscribe}
            >
              Підписатись
            </Button>
          </div>
          {successMessage && (
            <Typography
              color="green"
              className="mt-4 text-center font-bold"
            >
              {successMessage}
            </Typography>
          )}
        </div>
        <div className="flex flex-col md:flex-row items-center !justify-between">
          <Typography as="a" href="/" variant="h6" className="text-gray-900">
            Open Hearts
          </Typography>

          <div className="flex w-fit justify-center gap-2">
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-twitter text-lg" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-youtube text-lg" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-instagram text-lg" />
            </IconButton>
            <IconButton size="sm" color="gray" variant="text">
              <i className="fa-brands fa-github text-lg" />
            </IconButton>
          </div>
        </div>
        <Typography
          color="blue-gray"
          className="text-center mt-12 font-normal !text-gray-700"
        >
          &copy; {CURRENT_YEAR} Made with{" "}
          <a href="/" target="_blank">
            Open Hearts
          </a>{" "}
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
