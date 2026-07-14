package com.ems.employeeservice.service;

import com.ems.employeeservice.dto.EmployeeRequest;
import com.ems.employeeservice.dto.EmployeeResponse;
import org.springframework.data.domain.Page;

public interface EmployeeService {
    EmployeeResponse createEmployee(EmployeeRequest employeeRequest);
    EmployeeResponse updateEmployee(Long id, EmployeeRequest employeeRequest);
    void deleteEmployee(Long id);
    EmployeeResponse getEmployeeById(Long id);
    Page<EmployeeResponse> getAllEmployees(String search, int page, int size, String sortBy, String sortDir);
    void assignDepartment(Long employeeId, Long departmentId);
}
