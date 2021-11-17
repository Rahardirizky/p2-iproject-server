# p2-iproject-server
Individual Project - Server


--nodemailer kirim email isi receipt
--api 2: 1.cek disposable email
        2. math calculator api front end
--socket
--search
--pagination


user : email password role
service: name(cuci, setrika, cuci dan setrika), fee
order: UserId, serviceId, total Kg, total fee, status, payment(paid, unpaid)

kalau customer login, 

flow
1.customer drop barang
2.admin buat order
3.customer terima email isi receipt dan default password
4.customer login pake email dan default password, (untuk chat dan track)
5.admin login email pass sendiri, bisa cek semua kerjaan, bisa ganti status kerjaan dan payment.
6.kalau statusnya di done, kirim email ke cust kalau sudah selesai.