-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2023 at 09:05 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pksuccesstrading`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminid` int(11) NOT NULL,
  `adminname` varchar(255) NOT NULL,
  `adminemail` varchar(255) NOT NULL,
  `adminpassword` varchar(255) NOT NULL,
  `admingender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminid`, `adminname`, `adminemail`, `adminpassword`, `admingender`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$qMVNYELr.ZZYwOmCoa0D9O6IJt0j16Kf9zcoyTTjunNtCpMlG8QGy', 'male');

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `bankid` int(11) NOT NULL,
  `bankname` varchar(255) NOT NULL,
  `bankaccount` varchar(255) NOT NULL,
  `banktitle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`bankid`, `bankname`, `bankaccount`, `banktitle`) VALUES
(9, 'Habib Bank Limited', '112233445566778899001122', 'ABCD EFGH'),
(10, 'Meezan Bank Limited', '556677889900112233445566', 'IJKL MNOP');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `clientid` int(11) NOT NULL,
  `clientname` varchar(255) NOT NULL,
  `clientemail` varchar(255) NOT NULL,
  `clientphone` varchar(16) NOT NULL,
  `clientpassword` varchar(255) NOT NULL,
  `clientgender` varchar(255) NOT NULL,
  `activedate` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`clientid`, `clientname`, `clientemail`, `clientphone`, `clientpassword`, `clientgender`, `activedate`) VALUES
(14, 'John Abraham', 'johnabraham@gmail.com', '01234567891', '$2b$10$qMVNYELr.ZZYwOmCoa0D9O6IJt0j16Kf9zcoyTTjunNtCpMlG8QGy', 'Male', 'Fri Jun 02 2023 20:13:47 GMT+0500 (Pakistan Standard Time)'),
(15, 'Ali Baba', 'alibaba@yahoo.com', '01122334455', '$2b$10$LbzZvpK4OQUPZCMwOiYIWOoLhO7hJUpjT0Uv9mHrHnfcV1rvwYBjy', 'Male', 'Fri Jun 02 2023 23:36:42 GMT+0500 (Pakistan Standard Time)'),
(16, 'Emma Watson', 'emmawatson@outlook.com', '02233445566', '$2b$10$xTVakEEYfGZhm9JW/8dOT.iKFPa7ofXSQsqaVy8OSELpBFXEEOTnm', 'Female', 'Fri Jun 02 2023 23:40:01 GMT+0500 (Pakistan Standard Time)');

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

CREATE TABLE `deposit` (
  `depositid` int(11) NOT NULL,
  `depositamount` decimal(10,0) NOT NULL,
  `raqam` decimal(10,0) NOT NULL,
  `deposittransaction` varchar(255) NOT NULL,
  `depositday` int(11) NOT NULL,
  `planid` int(11) NOT NULL,
  `clientid` int(11) NOT NULL,
  `depositstatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `deposit`
--

INSERT INTO `deposit` (`depositid`, `depositamount`, `raqam`, `deposittransaction`, `depositday`, `planid`, `clientid`, `depositstatus`) VALUES
(61, '35000', '1516', '12345678901234', 3, 4, 14, 'Approved'),
(62, '170000', '0', '45678901234567', 2, 6, 16, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedbackid` int(11) NOT NULL,
  `feedbacktitle` varchar(500) NOT NULL,
  `clientid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedbackid`, `feedbacktitle`, `clientid`) VALUES
(12, 'The best future investor!', 14),
(13, 'The most secure and time saving.', 15),
(14, 'I truly inspire with your service!', 16);

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `planid` int(11) NOT NULL,
  `planname` varchar(255) NOT NULL,
  `plandaily` decimal(10,0) NOT NULL,
  `plancomission` decimal(10,0) NOT NULL,
  `planwithdrawlimit` decimal(10,0) NOT NULL,
  `planmonthly` decimal(10,0) NOT NULL,
  `planvalidity` int(11) NOT NULL,
  `planprice` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`planid`, `planname`, `plandaily`, `plancomission`, `planwithdrawlimit`, `planmonthly`, `planvalidity`, `planprice`) VALUES
(1, 'Lite', '110', '10', '0', '3000', 4, '2500'),
(2, 'Basic', '303', '10', '0', '9100', 4, '7000'),
(3, 'Plus', '650', '10', '0', '19500', 4, '15000'),
(4, 'Pro', '1516', '10', '0', '45480', 4, '35000'),
(5, 'Ultra', '3466', '10', '0', '103980', 4, '80000'),
(6, 'Legend', '7366', '10', '0', '220980', 4, '170000');

-- --------------------------------------------------------

--
-- Table structure for table `referral`
--

CREATE TABLE `referral` (
  `referralid` int(11) NOT NULL,
  `referralamount` decimal(10,0) NOT NULL,
  `clientid` int(11) NOT NULL,
  `referralname` varchar(255) NOT NULL,
  `referralstatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `referral`
--

INSERT INTO `referral` (`referralid`, `referralamount`, `clientid`, `referralname`, `referralstatus`) VALUES
(20, '0', 15, 'johnabraham@gmail.com', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `subadmin`
--

CREATE TABLE `subadmin` (
  `subadminid` int(11) NOT NULL,
  `subadminname` varchar(255) NOT NULL,
  `subadminemail` varchar(255) NOT NULL,
  `subadminpassword` varchar(255) NOT NULL,
  `subadmingender` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subadmin`
--

INSERT INTO `subadmin` (`subadminid`, `subadminname`, `subadminemail`, `subadminpassword`, `subadmingender`) VALUES
(1, 'subadmin', 'subadmin@gmail.com', '$2b$10$qMVNYELr.ZZYwOmCoa0D9O6IJt0j16Kf9zcoyTTjunNtCpMlG8QGy', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `withdraw`
--

CREATE TABLE `withdraw` (
  `withdrawid` int(11) NOT NULL,
  `withdrawbank` varchar(255) NOT NULL,
  `withdrawamount` decimal(10,0) NOT NULL,
  `withdrawtitle` varchar(255) NOT NULL,
  `withdrawaccount` int(11) NOT NULL,
  `clientid` int(11) NOT NULL,
  `withdrawstatus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminid`),
  ADD UNIQUE KEY `adminemail` (`adminemail`);

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`bankid`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`clientid`),
  ADD UNIQUE KEY `clientemail` (`clientemail`);

--
-- Indexes for table `deposit`
--
ALTER TABLE `deposit`
  ADD PRIMARY KEY (`depositid`),
  ADD UNIQUE KEY `clientid` (`clientid`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedbackid`),
  ADD UNIQUE KEY `clientid` (`clientid`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`planid`),
  ADD UNIQUE KEY `planname` (`planname`);

--
-- Indexes for table `referral`
--
ALTER TABLE `referral`
  ADD PRIMARY KEY (`referralid`),
  ADD UNIQUE KEY `clientid` (`clientid`);

--
-- Indexes for table `subadmin`
--
ALTER TABLE `subadmin`
  ADD PRIMARY KEY (`subadminid`),
  ADD UNIQUE KEY `subadminemail` (`subadminemail`);

--
-- Indexes for table `withdraw`
--
ALTER TABLE `withdraw`
  ADD PRIMARY KEY (`withdrawid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adminid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `bankid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `clientid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `depositid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedbackid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `planid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `referral`
--
ALTER TABLE `referral`
  MODIFY `referralid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `subadmin`
--
ALTER TABLE `subadmin`
  MODIFY `subadminid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `withdraw`
--
ALTER TABLE `withdraw`
  MODIFY `withdrawid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
