package com.ems.employeeservice.controller;

import com.ems.employeeservice.dto.EmployeeRequest;
import com.ems.employeeservice.dto.EmployeeResponse;
import com.ems.employeeservice.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/employees")
@Slf4j
@Tag(name = "Employee-API", description = "Endpoints for Employee CRUD operations, Search, Pagination, and Department assignments")
public class EmployeeController {

    private final EmployeeService employeeService;

    // Explicit constructor injection
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    @Operation(summary = "Create Employee", description = "Adds a new employee record after validating input details.")
    public ResponseEntity<EmployeeResponse> createEmployee(@Valid @RequestBody EmployeeRequest employeeRequest) {
        log.info("Received request to create employee: {} {}", employeeRequest.getFirstName(), employeeRequest.getLastName());
        EmployeeResponse response = employeeService.createEmployee(employeeRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update Employee", description = "Updates an existing employee record by ID.")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable Long id, 
            @Valid @RequestBody EmployeeRequest employeeRequest) {
        log.info("Received request to update employee with id: {}", id);
        EmployeeResponse response = employeeService.updateEmployee(id, employeeRequest);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete Employee", description = "Removes an employee record from the system by ID.")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        log.info("Received request to delete employee with id: {}", id);
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Employee by ID", description = "Retrieves a single employee record by ID.")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) {
        log.info("Received request to get employee with id: {}", id);
        EmployeeResponse response = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "Get All Employees", description = "Retrieves a paginated list of employee records with optional sorting and multi-field search filtering.")
    public ResponseEntity<Page<EmployeeResponse>> getAllEmployees(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir) {
        log.info("Received request to get all employees");
        Page<EmployeeResponse> response = employeeService.getAllEmployees(search, page, size, sortBy, sortDir);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}/department")
    @Operation(summary = "Assign Department", description = "Assigns or transfers an employee to a department.")
    public ResponseEntity<String> assignDepartment(
            @PathVariable Long id,
            @RequestParam("departmentId") Long departmentId) {
        log.info("Received request to assign department id {} to employee id {}", departmentId, id);
        employeeService.assignDepartment(id, departmentId);
        return ResponseEntity.ok("Department assigned successfully");
    }
}
