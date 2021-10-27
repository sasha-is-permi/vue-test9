<template>
   <div>
      <section >
        <div class="container mt-3">   
            <div class="block-shadow">    

            <!-- Вывод заголовка:  месяц и год --> 
            <div class="head-calendar">
               <div class="arrow arrow-left">
                     <p @click="back">&lsaquo;</p>   
                    </div>
                    <h3>{{ header }}</h3>
                    <div class="arrow arrow-right">
                        <p @click="next"> &rsaquo; </p>
                    </div>
                </div>

            <table>
                  
           <!-- Вывод дней недели в заголовке -->       
           <tr class="calendar" >
				<th v-for="d in days" :key="d">{{d}}</th>
			</tr>
                
 
            <!-- Вывод данных в календарь --> 
     <tr v-for="week in calendar()" :key="week">					   
				<td v-for="day in week" :key="day"   > {{ day.index }} </td>
  	</tr>	
    

            </table>
            </div>           
           
        </div>
    </section>

   </div>
</template>

<script>

//     date: {},  просматриваемая дата
//     day:""     просматриваемый день
//     month:"",  просматриваеимый месяц
//     year:"",   просматриваемый год 


export default {
  data(){
    return{
       day:"",
       month:"",
       monthNumber:0,
       year:2021,
       days:["mon","tue", "wed", "thu", "fri", "sat", "sun"],
       months : ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"]
     
    

    }
  },
  methods: {

   // Формирование массива для последующего вывода дней в календарь
   calendar() {
			let days = [];
			let week = 0;
			days[week] = [];
			let dlast = new Date(this.year, this.monthNumber + 1, 0).getDate();
                for (let i = 1; i <= dlast; i++) {
                    if (new Date(this.year, this.monthNumber, i).getDay() != 1) {
						let a = {index:i};
                        days[week].push(a);					
						}
                     else {
                        week++;
						
                        days[week] = [];
						let a = {index:i};
                        days[week].push(a);
						
						}
                    }

				if (days[0].length > 0) {
					for (let i = days[0].length; i < 7; i++) {
						days[0].unshift('');
						
					}
				}
				  
				
				return days;
			},    


  // Переход на месяц раньше
  back(){
       this.monthNumber--;
       if (this.monthNumber < 0) {
       this.monthNumber = 12;
       this.monthNumber--;
       this.year--;
                    }
       this.month = this.getMonthMethod(this.monthNumber)

  },
  // Переход на месяц позже
  next(){
       this.monthNumber++;
           if (this.monthNumber > 11) {
           this.monthNumber = -1;
           this.monthNumber++;
           this.year++;
                    }
       this.month = this.getMonthMethod(this.monthNumber)            
  },
  computed:{
   header(){
     return   this.month + " " + this.year
   },
   

 
  },

// Получение из  массива месяцев this.mothhs наименования месяца в виде строки
getMonthMethod(monthNumber){   
   let nameMonth = this.months[monthNumber];
   return  nameMonth
   }

  },
  computed: {
     header(){
       return this.month + " " + this.year
     }


  },

  created(){
    // Используем хук created на этапе создаения приложения- считываем текущую дату
    // Он вызывается до построения DOM-дерева
    let date =  new Date()              // получаем текущую дату

    this.day   = date.getDate()           // используем стандартный метод для получения дня месяца   

    this.monthNumber = date.getMonth()   // номер просматриваемого месяца 0-11 
    this.month = this.getMonthMethod(this.monthNumber)    // используем собственный метод для получение наименования месяца
    this.year  = +date.getFullYear()       // используем стандартный метод для получения года
  
  } 
  
}
</script>




<!-- Стили только для этого файла (scoped) -->

<style scoped >



.block-shadow {
    box-shadow: 0 4px 4px rgba(148, 113, 113, 0.2);
    width: 50%; 
}
table {
    border: 1px solid #eceff2;
    border-top: none;
     width: 100%;
    table-layout: fixed;
    text-align: center;
    padding: 30px;
}
tr, th, td {
    padding: 15px;
}

th {
    padding-top: 0;
    color: #3e3ecf;
    text-transform: uppercase;
    font-weight: 400;
}
td {
    color: grey;
}
.head-calendar {
    border-top: 1px solid #eceff2;
    border-left: 1px solid #eceff2;
    border-right: 1px solid #eceff2;
    padding: 25px;
    justify-content: space-between;
    display: flex;
    padding-bottom: 0;
   width: 100%;
}
.arrow p {
    cursor: pointer;
    color: grey;
    font-size: 30px;
}
.calendar {
    padding-top: 0;
    border-bottom: 1px solid #eceff2;;
}
h3 {
    color:grey;
    font-weight: 400;
}

.month p {
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 0;
    margin-top: -10px;
}
.month-new p {
    text-transform: uppercase;
    margin-top: -10px;
    margin-bottom: 0;
    font-size: 12px;
}



</style>
