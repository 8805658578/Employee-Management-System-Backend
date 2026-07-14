package com.ems.employeeservice.service.impl;

import com.ems.employeeservice.dto.EmployeeRequest;
import com.ems.employeeservice.dto.EmployeeResponse;
import com.ems.employeeservice.entity.Employee;
import com.ems.employeeservice.exception.BadRequestException;
import com.ems.employeeservice.exception.ResourceNotFoundException;
import com.ems.employeeservice.repository.EmployeeRepository;
import com.ems.employeeservice.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    // Explicit constructor injection
    public EmployeeServiceImpl(EmployeeRepository employeeRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public EmployeeResponse createEmployee(EmployeeRequest employeeRequest) {
        log.info("Creating employee with email: {}", employeeRequest.getEmail());
        
        if (employeeRepository.existsByEmail(employeeRequest.getEmail())) {
            log.warn("Email already exists: {}", employeeRequest.getEmail());
            throw new BadRequestException("Employee email is already registered");
        }

        Employee employee = modelMapper.map(employeeRequest, Employee.class);
        Employee savedEmployee = employeeRepository.save(employee);
        log.info("Employee created successfully with id: {}", savedEmployee.getId());

        return modelMapper.map(savedEmployee, EmployeeResponse.class);
    }

    @Override
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest employeeRequest) {
        log.info("Updating employee with id: {}", id);
        
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Update failed: Employee not found with id: {}", id);
                    return new ResourceNotFoundException("Employee not found with id: " + id);
                });

        if (employeeRepository.existsByEmailAndIdNot(employeeRequest.getEmail(), id)) {
            log.warn("Update failed: New email already exists: {}", employeeRequest.getEmail());
            throw new BadRequestException("Employee email is already registered by another employee");
        }

        // Map request body fields to existing employee entity
        employee.setFirstName(employeeRequest.getFirstName());
        employee.setLastName(employeeRequest.getLastName());
        employee.setEmail(employeeRequest.getEmail());
        employee.setMobileNumber(employeeRequest.getMobileNumber());
        employee.setAddress(employeeRequest.getAddress());
        employee.setGender(employeeRequest.getGender());
        employee.setDateOfBirth(employeeRequest.getDateOfBirth());
        employee.setDateOfJoining(employeeRequest.getDateOfJoining());
        employee.setSalary(employeeRequest.getSalary());
        employee.setDepartmentId(employeeRequest.getDepartmentId());
        employee.setDesignation(employeeRequest.getDesignation());
        employee.setStatus(employeeRequest.getStatus());

        Employee updatedEmployee = employeeRepository.save(employee);
        log.info("Employee updated successfully with id: {}", id);

        return modelMapper.map(updatedEmployee, EmployeeResponse.class);
    }

    @Override
    public void deleteEmployee(Long id) {
        log.info("Deleting employee with id: {}", id);
        
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Delete failed: Employee not found with id: {}", id);
                    return new ResourceNotFoundException("Employee not found with id: " + id);
                });

        employeeRepository.delete(employee);
        log.info("Employee with id {} deleted successfully", id);
    }

    @Override
    public EmployeeResponse getEmployeeById(Long id) {
        log.info("Fetching employee with id: {}", id);
        
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Fetch failed: Employee not found with id: {}", id);
                    return new ResourceNotFoundException("Employee not found with id: " + id);
                });

        return modelMapper.map(employee, EmployeeResponse.class);
    }

    @Override
    public Page<EmployeeResponse> getAllEmployees(String search, int page, int size, String sortBy, String sortDir) {
        log.info("Fetching all employees with search: {}, page: {}, size: {}, sortBy: {}, sortDir: {}", 
                search, page, size, sortBy, sortDir);

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) 
                ? Sort.by(sortBy).ascending() 
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Employee> employeePage;

        if (search != null && !search.trim().isEmpty()) {
            employeePage = employeeRepository
                    .findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                            search, search, search, pageable);
        } else {
            employeePage = employeeRepository.findAll(pageable);
        }

        return employeePage.map(employee -> modelMapper.map(employee, EmployeeResponse.class));
    }

    @Override
    public void assignDepartment(Long employeeId, Long departmentId) {
        log.info("Assigning department id {} to employee id {}", departmentId, employeeId);
        
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> {
                    log.error("Assignment failed: Employee not found with id: {}", employeeId);
                    return new ResourceNotFoundException("Employee not found with id: " + employeeId);
                });

        employee.setDepartmentId(departmentId);
        employeeRepository.save(employee);
        log.info("Department assigned successfully");
    }
}
