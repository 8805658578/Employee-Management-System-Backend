package com.ems.departmentservice.service;

import com.ems.departmentservice.dto.DepartmentRequest;
import com.ems.departmentservice.dto.DepartmentResponse;

import java.util.List;

public interface DepartmentService {
    DepartmentResponse createDepartment(DepartmentRequest departmentRequest);
    DepartmentResponse updateDepartment(Long id, DepartmentRequest departmentRequest);
    void deleteDepartment(Long id);
    DepartmentResponse getDepartmentById(Long id);
    List<DepartmentResponse> getAllDepartments();
}
