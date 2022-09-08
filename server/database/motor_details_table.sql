-- Motor Details

Create table motor_details
(
	id bigint auto_increment,
    reg_number varchar(50) not null,
    recipent_id int not null,
    
    is_communication_required boolean default false,
    created_date datetime DEFAULT CURRENT_TIMESTAMP,
	updated_date datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);
