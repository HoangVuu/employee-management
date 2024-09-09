import { FC, useState } from "react";
import { Employee } from "../types/employee";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

interface EmployeeCardProps {
  employee: Employee;
  lastEmployeeRef?: React.RefCallback<HTMLDivElement> | null;
  onDelete: (id: number) => void;
}

const EmployeeCard: FC<EmployeeCardProps> = ({
  employee,
  lastEmployeeRef,
  onDelete,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={lastEmployeeRef}
      className="relative border p-4 rounded-lg hover:shadow-lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="w-full flex flex-col md:flex-row items-center">
        {/* Delete button */}
        {hover && (
          <button
            className="delete-button bg-pink-500 text-black p-2 rounded"
            onClick={() => onDelete(employee.id)}
          >
            X
          </button>
        )}

        <div className=" w-full md:w-1/4 rounded-lg">
          <Swiper>
            {employee?.positions[0].toolLanguages[0].images.map((image) => (
              <SwiperSlide key={image.id} className="w-full rounded-lg">
                <Image
                  src={image.cdnUrl}
                  alt="Portfolio"
                  width={300}
                  height={100}
                  className="w-full rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col ml-0 w-full">
          <div className="flex flex-row items-center w-full">
            <div className="text-xl font-bold mt-3">{employee.name}</div>
            <div>{employee?.totalExp} years experience</div>
          </div>
          <p>{employee.positions[0].toolLanguages[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
