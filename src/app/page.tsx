"use client";

import EmployeeCard from "@/lib/components/employee-card";
import { Employee, Position } from "@/lib/types/employee";
import { useCallback, useEffect, useRef, useState } from "react";
import employeeList from "@/lib/mocks/employee-list.json";

const Home: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [isInitialRender, setIsInitialRender] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const DEFAULT_OFFSET = 9;
  const calculateExperience = (positions: Position[]) => {
    let totalExperience = 0;

    positions.forEach((position) => {
      position.toolLanguages.forEach((language) => {
        totalExperience += language.to - language.from;
      });
    });

    return totalExperience;
  };

  useEffect(() => {
    // Map totalExperience after calculation
    const employeesWithExperience = employeeList.map((employee) => ({
      ...employee,
      totalExp: calculateExperience(employee.positions),
    }));

    // Sort employees by total years of experience in descending order
    const sortedEmployees = employeesWithExperience.sort(
      (a, b) => b.totalExp - a.totalExp
    );

    // Filter employees
    const filterdEmployee = sortedEmployees.filter((e) =>
      e.name.toLowerCase().includes(searchInput)
    );

    setEmployees(filterdEmployee.slice(0, DEFAULT_OFFSET * (1 + pageNumber)));
  }, [searchInput, pageNumber]);

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const lastEmployeeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isInitialRender) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observerRef.current.observe(node);
      setIsInitialRender(false);
    },
    [isInitialRender]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <form className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchInput}
          onChange={onInputChange}
          className="border border-gray-300 p-2 rounded-lg w-full md:w-1/3 pl-2"
        />
      </form>

      {/* Render employee list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {employees?.length ? (
          employees?.map((employee, index) => {
            console.log('employees', employees.length);
            console.log('index', index +1);

              return (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  lastEmployeeRef={employees.length === index + 1 ? lastEmployeeRef : null}
                  onDelete={handleDelete}
                />
              );
          })
        ) : (
          <p>
            No result founds with: <b>{searchInput}</b>
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
