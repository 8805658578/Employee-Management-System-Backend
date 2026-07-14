package com.ems.employeeservice.dto;

import com.ems.employeeservice.entity.EmployeeStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String address;
    private String gender;
    private LocalDate dateOfBirth;
    private LocalDate dateOfJoining;
    private Double salary;
    private Long departmentId;
    private DepartmentDto department;
    private String designation;
    private EmployeeStatus status;
}
