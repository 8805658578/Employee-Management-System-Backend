package com.ems.departmentservice.repository;

import com.ems.departmentservice.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Boolean existsByName(String name);
    Boolean existsByNameAndIdNot(String name, Long id);
}
