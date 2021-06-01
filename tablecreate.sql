DROP TABLE IF EXISTS  visitors;
DROP TABLE IF EXISTS  vehicles;
DROP TABLE IF EXISTS complaintdb;
DROP TABLE IF EXISTS  events;
DROP TABLE IF EXISTS  relation;
DROP TABLE IF EXISTS  service;
DROP TABLE IF EXISTS  bills;
DROP TABLE IF EXISTS housekeeping;

DROP TABLE IF EXISTS flatdb;
DROP TABLE IF EXISTS  userdb;

CREATE TABLE userdb (
	userid int(4),
	first_name varchar(255),
	last_name varchar(255),
	username varchar(255),
	password varchar(255),
	mobile varchar(10),
	role varchar(255),
	PRIMARY KEY (userid)
);

insert into userdb values(
	1001,
    "Rachel",
	"Green",
	"rachel",
	"rachel",
	"1234567890",
	"owner"
	);
insert into userdb values(
	1002,
	"Ross",
	"Geller",
	"ross",
	"ross",
	"1122334455",
	"owner"
	);
insert into userdb values(
	1003,
	"Monica",
	"Geller",
	"monica",
	"monica",
	"1231231234",
	"tenant"
	);
insert into userdb values(
	1004,
	"Phoebe",
	"Buffay",
	"phoebe",
	"phoebe",
	"3344556677",
	"tenant"
	);
insert into userdb values(
	1005,
	"Joey",
	"Tribbiani",
	"joey",
	"joey",
	"4545454545",
	"association"
	);
insert into userdb values(
	1006,
	"Chandler",
	"Bing",
	"chandler",
	"chandler",
	"1212121212",
	"association"
	);
insert into userdb values(
	1007,
	"Mike",
	"Hannigan",
	"mike",
	"mike",
	"7766554433",
	"security"
	);
insert into userdb values(
	1008,
	"Jill",
	"Green",
	"jill",
	"jill",
	"0987654321",
	"security"
	);
	insert into userdb values(
		6001,
		"Rose",
		"Stager",
		"rose",
		"rose",
		"0987654333",
		"housekeeping"
		);
	insert into userdb values(
		6002,
		"Dabby",
		"Fletcher",
		"dabby",
		"dabby",
		"0989444333",
		"housekeeping"
		);
	insert into userdb values(
		6003,
		"Cyrus",
		"Smores",
		"cyrus",
		"cyrus",
		"0937444333",
		"housekeeping"
		);

	insert into userdb values(
		6004,
		"Cadence",
		"Mathewss",
		"cadence",
		"cadence",
		"0984444333",
		"housekeeping"
		);

	insert into userdb values(
		6005,
		"Arwen",
		"Jose",
		"arwen",
		"arwen",
		"0987144333",
		"housekeeping"
		);


	CREATE TABLE flatdb (
		flatid int(4),
		blockno int(2),
		flatno int(4),
		ownerid int(4),
		tenantid int(4),
		status varchar(50),
		bhk int(2),
		sqft int,
		PRIMARY KEY (flatid),
		FOREIGN KEY (ownerid) REFERENCES userdb(userid),
		FOREIGN KEY (tenantid) REFERENCES userdb(userid)
	);

	insert into flatdb values(
	        2001,
		1,
		1101,
		1001,
		NULL,
		'rent',
		3,
		1800
	);
	insert into flatdb values(
	        2002,
		2,
		2201,
		1002,
		1003,
		'sale',
		2,
		1400
	);
	insert into flatdb values(
	        2003,
		3,
		3303,
		1001,
		1004,
		NULL,
		3,
		1600
	);
	insert into flatdb values(
	        2004,
		4,
		4404,
		1002,
		1002,
		NULL,
		2,
		1300
	);
	insert into flatdb values(
	        2005,
		5,
		5505,
		1001,
		1001,
		NULL,
		3,
		1900
	);
	insert into flatdb values(2006,6,6606,1005,1005,NULL,2,1750);
	insert into flatdb values(2007,7,7707,1006,NULL,NULL,3,1950);

	CREATE TABLE complaintdb (
		complaintid int(4),
		complaint varchar(255),
		action varchar(255),
		userid int(4),
		flatno int(4),
		PRIMARY KEY (complaintid),
		FOREIGN KEY (userid) REFERENCES userdb(userid)
	);

	insert into complaintdb values(
	        4001,
		"Termite infestation in bathroom",
		NULL,
		1001,
		5505
	);

	insert into complaintdb values(
	        4002,
		"Kitchen sink leakage",
		NULL,
		1003,
		2201
	);

	insert into complaintdb values(
	        4003,
		"Tubelight not working",
		"Electrician sent",
		1004,
		3303
	);


create table relation(
role varchar(20),
service_id integer(4),
constraint Pk_relation primary key(role,service_id)
);
insert into relation values('owner','3001');
insert into relation values('owner','3002');
insert into relation values('owner','3003');
insert into relation values('owner','3004');
insert into relation values('owner','3005');
insert into relation values('owner','3006');

insert into relation values('association','3001');
insert into relation values('association','3002');
insert into relation values('association','3003');
insert into relation values('association','3004');
insert into relation values('association','3005');
insert into relation values('association','3006');
insert into relation values('association','3007');

insert into relation values('tenant','3001');
insert into relation values('tenant','3002');
insert into relation values('tenant','3003');
insert into relation values('tenant','3004');
insert into relation values('tenant','3005');
insert into relation values('tenant','3006');

insert into relation values('security','3007');

insert into relation values('housekeeping','3006');

CREATE TABLE housekeeping (
	servantid int(4),
	first_name varchar(255),
	last_name varchar(255),
	status varchar(255),
	work varchar(255),
        request varchar(255),
	PRIMARY KEY (servantid)
);

insert into housekeeping values('6001','Rose','Stager','available','Cleaning','no');
insert into housekeeping values('6002','Dabby','Fletcher','busy','Miscellaneous','no');
insert into housekeeping values('6003','Cyrus','Smores','available','Washing','no');
insert into housekeeping values('6004','Cadence','Mathewss','busy','Laundary','no');
insert into housekeeping values('6005','Arwen','Jose','available','Dusting','no');

create table service(
service_id integer(4),
service_name varchar(255),
service_desc varchar(255),
primary key(service_id)
);
insert into service values('3001','Property Management','We manage your property details');
insert into service values('3002','Complaint forum','We manage your complaints');
insert into service values('3003','Bill Management','We manage your bill payment statuses');
insert into service values('3004','Clubhouse Facilities','We help in booking clubhouse facilities');
insert into service values('3005','Events','We help manage events');
insert into service values('3006','Housekeeping','We help in getting housekeeping staff for you');
insert into service values('3007','Security Ledger','Get details of the visitors who visited yur apartment');

create table events(
event_id int(4),
event_name varchar(255),
event_date date,
event_time time,
event_venue varchar(255),
user int(4),
status varchar(20),
foreign key(user) references userdb(userid)
);
insert into events values('4001','Mikes Birthday','2021-02-23','08:05:33','Party hall','1001','cancelled');
insert into events values('4002','New year celebs','2021-03-22','07:09:33','Party hall','1002','cancelled');
insert into events values('4003','Rosss wedding aniv','2021-01-23','08:05:33','Party hall','1003','completed');
insert into events values('4004','Deepavali Celeb','2021-04-24','08:30:00','Terrace','1002','completed');
insert into events values('4005','Christmas Party','2021-04-29','08:30:00','Terrace','1002','active');
insert into events values('4006','Anniversary','2021-04-30','08:30:00','Party hall','1001','active');
insert into events values('4007','Christmas Party','2021-04-23','08:30:00','Terrace','1002','completed');
insert into events values('4008','Birthday','2021-04-29','18:11:00','Party hall','1002','active');

	CREATE table visitors(
	  visitorid int(4),
	  first_name varchar(255),
		last_name varchar(255),
	  mobile varchar(10),
	  temperature float,
	  visit_date date,
	  visit_time time,
	  herefor int(4),
	  PRIMARY KEY (visitorid),
	  FOREIGN KEY (herefor) REFERENCES userdb(userid)
	);

	insert into visitors values(2001, 'Harvey', 'Spector', '6789009876', 96.7, '2021-02-23', '08:05:33', 1003);
	insert into visitors values(2002, 'Donna', 'Paulsen', '9876098765', 97.9,'2021-03-20', '17:30:00', 1004);
	insert into visitors values(2003, 'Rachel', 'Zane', '9988676688',  98.8, '2021-02-27', '13:10:00', 1002);
	insert into visitors values(2004, 'Michael', 'Ross', '9080707678', 95.7, '2021-03-28', '16:05:33', 1001);
	insert into visitors values(2005, 'Jessica', 'Pearson', '8796056789', 97.0,'2021-02-23', '08:05:33', 1003);
	insert into visitors values(2006, 'Louis', 'Litt', '6789009876', 96.7, '2021-03-01', '10:30:00', 1005);

CREATE table vehicles(
  vehicleid int(4),
  vehicleno varchar(255),
	drivername varchar(255),
  driverno varchar(10),
  visit_date date,
  visit_time time,
  herefor int(4),
  PRIMARY KEY (vehicleid),
  FOREIGN KEY (herefor) REFERENCES userdb(userid)
);

insert into vehicles values(6001, 'TN 01 U 0099', 'Ashwin Kumar', '6789009876', '2021-02-23', '08:05:33', 1003);
insert into vehicles values(6002, 'MH 02 BY 3123', 'Shivangi Krish', '9876098765', '2021-03-20', '17:30:00', 1004);
insert into vehicles values(6003, 'TN 200 KA 9696', 'Pugazh', '9988676688',  '2021-02-27', '13:10:00', 1002);
insert into vehicles values(6004, 'TN 72 BF 3366', 'Bala', '9080707678', '2021-03-28', '16:05:33', 1001);
insert into vehicles values(6005, 'TN 01 A 4295', 'Baba Baskar', '8796056789','2021-02-23', '08:05:33', 1005);
insert into vehicles values(6006, 'TN 45 AK 6591', 'Venkatesh Bhatt', '6789009876', '2021-03-01', '10:30:00', 1006);

	create table bills(
	bill_id int(4),
	flat_id int(4),
	water int,
	gas int,
	electricity int,
	primary key(bill_id),
	foreign key(flat_id) references flatdb(flatid)
	);

	insert into bills values('5001','2001','0','0','0');
	insert into bills values('5002','2002','42','2','720');
	insert into bills values('5003','2003','40','1','700');
	insert into bills values('5004','2004','46','2','740');
	insert into bills values('5005','2005','48','1','750');
	insert into bills values('5006','2006','45','1','730');
	insert into bills values('5007','2007','0','0','0');
