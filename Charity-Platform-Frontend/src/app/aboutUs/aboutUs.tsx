"use client";
import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

function AboutUs() {
  const token = useSelector((state: any) => state.token.value);

  return (
    <section className="bg-gray-50 p-8">
      <header className="text-center py-16">
        <Typography variant="h3" color="blue-gray" className="mb-4">
          Про нас
        </Typography>
        <Typography variant="lead" color="blue-gray" className="max-w-2xl mx-auto">
          Ми прагнемо здійснити позитивний вплив на суспільство, надаючи підтримку індивідуумам через благодійні ініціативи та створюючи значущі зміни в громаді.
        </Typography>
      </header>

      <div className="text-center py-16">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Наша місія
        </Typography>
        <Typography variant="lead" color="blue-gray" className="max-w-3xl mx-auto">
          Ми прагнемо створити сталу та інклюзивну платформу, яка підтримує та посилює благодійні дії по всьому світу. Наша мета — зробити благодійність доступною, прозорою та ефективною.
        </Typography>
      </div>

      <div className="py-16">
        <Typography variant="h4" color="blue-gray" className="text-center mb-8">
          Знайомтесь з нашою командою
        </Typography>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="./image/james-person-1.jpg"
              alt="Team Member 1"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <Typography variant="h6" color="blue-gray" className="font-bold">
                Олександр Вівчаренко
              </Typography>
              <Typography variant="small" color="blue-gray">
                Генеральний директор і засновник
              </Typography>
            </div>
          </div>

          <div className="max-w-xs bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="image/james-person-2.jpg"
              alt="Team Member 2"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <Typography variant="h6" color="blue-gray" className="font-bold">
                Анна Писаренок
              </Typography>
              <Typography variant="small" color="blue-gray">
                Менеджерка проєктного відділу
              </Typography>
            </div>
          </div>

        </div>
      </div>

      <div className="py-16 bg-gray-100">
        <Typography variant="h4" color="blue-gray" className="text-center mb-8">
          Наші основні цінності
        </Typography>
        <div className="flex justify-center gap-8">
          <div className="text-center max-w-xs">
            <div className="h-16 w-16 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Співчуття
            </Typography>
            <Typography variant="small" color="blue-gray">
              Ми віримо в те, що прояв співчуття та емпатії є важливими у кожній ініціативі, яку ми підтримуємо.
            </Typography>
          </div>

          <div className="text-center max-w-xs">
            <div className="h-16 w-16 mx-auto bg-green-500 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🌍</span>
            </div>
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Стійкість
            </Typography>
            <Typography variant="small" color="blue-gray">
              Наш підхід спрямований на створення сталих та довготривалих змін у громадах по всьому світу.
            </Typography>
          </div>

          <div className="text-center max-w-xs">
            <div className="h-16 w-16 mx-auto bg-yellow-500 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <Typography variant="h6" color="blue-gray" className="font-bold">
              Інновації
            </Typography>
            <Typography variant="small" color="blue-gray">
              Ми приймаємо інновації, щоб знаходити креативні рішення для складних соціальних викликів.
            </Typography>
          </div>
        </div>
      </div>

      <div className="py-16 text-center">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Приєднуйтесь до нас у створенні змін
        </Typography>
        <Typography variant="small" color="blue-gray" className="mb-8">
          Станьте частиною змін! Ознайомтесь з нашими ініціативами та дізнайтесь, як ви можете допомогти зробити світ кращим.
        </Typography>

      </div>
    </section>
  );
}

export default AboutUs;
