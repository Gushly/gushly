// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";

contract GushlyImplementation {
    address internal employer;
    address internal employee;
    uint256 internal escrowBalance;
    uint256 internal employeeBalance;
    uint256 internal totalPaid;
    uint256 internal expiry;
    bool internal payByHour; // True = pay by hour, False = project fixed rate
    uint256 internal hourlyRate;
    uint256 internal projectRate;
    uint256 internal claimHour;
    uint256 internal claimValue;
    mapping(address => uint256) internal balances;

    enum Status {
        pendingEmployeeSignature,
        active,
        expired,
        pendingTermination,
        terminated
    }

    Status internal contractStatus;

    constructor(
        address _employer,
        address _employee,
        uint256 _expiry,
        bool _payByHour,
        uint256 _hourlyRate,
        uint256 _projectRate
    ) {
        employer = _employer;
        employee = _employee;
        escrowBalance = 0;
        employeeBalance = 0;
        totalPaid = 0;
        expiry = block.timestamp + _expiry;
        payByHour = _payByHour;
        hourlyRate = _hourlyRate;
        projectRate = _projectRate;
        claimHour = 0;
        claimValue = 0;
        contractStatus = Status.pendingEmployeeSignature;
    }

    modifier onlyEmployer() {
        require(msg.sender == employer, "You are not the employer");
        _;
    }

    modifier onlyEmployee() {
        require(msg.sender == employee, "You are not the employee");
        _;
    }

    modifier onlyEmployerOrEmployee() {
        require(
            msg.sender == employer || msg.sender == employee,
            "You are not the employer or the employee"
        );
        _;
    }

    receive() external payable {
        contractStatus = getContractStatus();
        require(contractStatus == Status.active || contractStatus == Status.pendingEmployeeSignature);
        escrowBalance += msg.value;
    }

    function signContract() public onlyEmployee {
        contractStatus = getContractStatus();
        require(contractStatus == Status.pendingEmployeeSignature);
        contractStatus = Status.active;
    }

    function getEmployer()
        external
        view
        onlyEmployerOrEmployee
        returns (address)
    {
        return employer;
    }

    function getEmployee()
        external
        view
        onlyEmployerOrEmployee
        returns (address)
    {
        return employee;
    }

    function getEscrowBalance()
        external
        view
        onlyEmployerOrEmployee
        returns (uint256)
    {
        return escrowBalance;
    }

    function getEmployeeBalance() external view onlyEmployee returns (uint256) {
        return employeeBalance;
    }

    function getEmployeeLocalBalance() external view onlyEmployee returns (uint256) {
        return balances[msg.sender];
    }

    function getTotalPaid()
        external
        view
        onlyEmployerOrEmployee
        returns (uint256)
    {
        return totalPaid;
    }

    function getExpiry() external view onlyEmployerOrEmployee returns (uint256) {
        return expiry;
    }

    function getPayByHour() external view onlyEmployerOrEmployee returns (bool) {
        return payByHour;
    }

    function getHourlyRate()
        external
        view
        onlyEmployerOrEmployee
        returns (uint256)
    {
        return hourlyRate;
    }

    function getProjectRate()
        external
        view
        onlyEmployerOrEmployee
        returns (uint256)
    {
        return projectRate;
    }

    function getContractStatus()
        public
        view
        onlyEmployerOrEmployee
        returns (Status)
    {
        if (contractStatus == Status.terminated) {
            return Status.terminated;
        } else if (block.timestamp > expiry) {
            return Status.expired;
        } else {
            return contractStatus;
        }
    }

    function getClaimHour()
        external
        view
        onlyEmployerOrEmployee
        returns (uint256)
    {
        return claimHour;
    }

    function addClaimValueHourly(uint256 _claimHour) public onlyEmployee {
        contractStatus = getContractStatus();
        require(contractStatus == Status.active);
        claimHour += _claimHour;
        claimValue = claimHour * hourlyRate;
    }

    function addClaimValueProject(uint256 _claimProjectValue)
        public
        onlyEmployee
    {
        contractStatus = getContractStatus();
        require(contractStatus == Status.active);
        claimValue += _claimProjectValue;
    }

    function getClaimValue()
        external
        view
        onlyEmployerOrEmployee
        returns (uint256)
    {
        return claimValue;
    }

    function approveClaim(uint256 _claimApproved) public onlyEmployer {
        contractStatus = getContractStatus();
        require(contractStatus == Status.active);
        require(_claimApproved <= escrowBalance, "Insufficient escrow balance");
        require(
            _claimApproved <= claimValue,
            "You are approving more than claimValue"
        );

        if (payByHour) {
            require(
                _claimApproved % claimHour == 0,
                "Amount approved must be a multiple of hourly rate"
            );
            claimHour -= (_claimApproved / hourlyRate);
            claimValue = claimHour * hourlyRate;
            escrowBalance -= _claimApproved;
            employeeBalance += _claimApproved;
            totalPaid += _claimApproved;
        } else {
            claimValue -= _claimApproved;
            escrowBalance -= _claimApproved;
            employeeBalance += _claimApproved;
            totalPaid += _claimApproved;
        }
    }

    function withdraw(uint256 _withdrawAmount) public onlyEmployee {
        require(
            _withdrawAmount <= employeeBalance,
            "Insufficient employee balance"
        );
        employeeBalance -= _withdrawAmount;
        payable(msg.sender).transfer(_withdrawAmount);
    }

    function withdrawLocal(uint256 _withdrawAmount) public onlyEmployee {
        require(
            _withdrawAmount <= employeeBalance,
            "Insufficient employee balance"
        );
        employeeBalance -= _withdrawAmount;
        balances[msg.sender] +=_withdrawAmount; //assume starting is 0
    }

    function requestTermination() public onlyEmployer {
        contractStatus = getContractStatus();
        require(contractStatus == Status.active);
        contractStatus = Status.pendingTermination;
    }

    function approveTermination() public onlyEmployee {
        contractStatus = getContractStatus();
        require(contractStatus == Status.pendingTermination);
        contractStatus = Status.terminated;
    }

    function withdrawRemainingFund() public onlyEmployer {
        contractStatus = getContractStatus();
        require(
            contractStatus == Status.terminated ||
                contractStatus == Status.expired
        );

        uint256 remainingAmount = escrowBalance;
        escrowBalance = 0;
        payable(msg.sender).transfer(remainingAmount);
    }

    function extendExpiry(uint256 _extension) public onlyEmployer {
        contractStatus = getContractStatus();
        require(contractStatus != Status.terminated);

        expiry += _extension;
    }
}
