<template>
      <section >
        <div class="container mt-3">   
            <div class="block-shadow">         
            <table>
                
                <div class="head-calendar">
                    <div class="arrow arrow-left">
                        <p> &lsaquo; </p>
                    </div>
                    <h3>June 2017</h3>
                    <div class="arrow arrow-right">
                        <p> &rsaquo; </p>
                    </div>
                </div>
            
            
                    
                
                <tr class="calendar">
                    <th>mon</th>
                    <th>tue</th>
                    <th>wed</th>
                    <th>thu</th>
                    <th>fri</th>
                    <th>sat</th>
                    <th>sun</th>
                </tr>
                <tr>
                    <td><div class="month"><p>jun</p></div>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                </tr>
                <tr>
                    <td>15</td>
                    <td>16</td>
                    <td>17</td>
                    <td>18</td>
                    <td>19</td>
                    <td>20</td>
                    <td>21</td>
                </tr>
                <tr>
                    <td>22</td>
                    <td>23</td>
                    <td>24</td>
                    <td>25</td>
                    <td>26</td>
                    <td>27</td>
                    <td>28</td>
                </tr>
                <tr>
                    <td>29</td>
                    <td>30</td>
                    <td class="bg-light"><div class="month-new"><p>jul</p>1 </div></td>
                    <td class="bg-light">2</td>
                    <td class="bg-light">3</td>
                    <td class="bg-light">4</td>
                    <td class="bg-light">5</td>
                </tr>
                <tr>
                    <td class="bg-light">6</td>
                    <td class="bg-light">7</td>
                    <td class="bg-light">8</td>
                    <td class="bg-light">9</td>
                    <td class="bg-light">10</td>
                    <td class="bg-light">11</td>
                    <td class="bg-light">12</td>
                </tr>
            
            </table>
            </div>           
           
        </div>
    </section>


</template>

<script>

//     date: {},  просматриваемая дата
//     day:""     просматриваемый день
//     month:"",  просматриваеимый месяц
//     year:"",   просматриваемый год 
//     currentDay   сегодняшний день
//     currentMonth сегодняшний месяц 
//     currentYear  сегодняшний год
//     shortMonth   короткое название месяца для отображение в ячейке календаря (над 1-м числом месяца)
//     nextShortMonth: короткое название будущего месяца для отображение в ячейке календаря (над 1-м числом месяца)

export default {
  data(){
    return{
       date: {},
       day:"",
       month:"",
       year:"",
       currentDay:"",
       currentMonth:"",
       currentYear:"",
       shortMonth:"",
       nextShortMonth:""
    }
  },
  methods: {

// Получение из даты наименование месяца в виде строки
getMonthMethod(monthNumber){   
   let months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
   return  months[monthNumber]; 
   },

getMonthMethod(date){   
   let month = date.getMonth()  // номер просматриваемого месяца 0-11   
   let months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
   return  months[month]; // 
   },

getShortMonthMethod(date){   
   let month = date.getMonth()  // номер просматриваемого месяца 0-11   
   let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   return  months[month]; // 
   },

 // Получение последнего числа месяца 
 // Обычно даты начинаются с 1, но технически возможно передать любое число, и дата сама себя поправит.
 // Так что если передать 0, то это значение будет соответствовать «один день перед первым числом месяца», 
 // другими словами: «последнее число прошлого месяца»
getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}   
   


  },

  created(){
    // Используем хук created на этапе создаения приложения- считываем текущую дату
    // Он вызывается до построения DOM-дерева
    let date =  new Date()              // получаем текущую дату


    // Используем локальные переменные для быстрой работы с данными
    let day   = getDate(date)           // используем стандартный метод для получения дня месяца   

    let monthNumber = date.getMonth()   // номер просматриваемого месяца 0-11 
    let month = getMonthMethod(monthNumber)    // используем собственный метод для получение наименования месяца
    let shortMonth = getShortMonthMethod(monthNumber)    // используем собственный метод для получение сокращенного наименования месяца (в ячейке календаря отображается)
    let nextShortMonth = getShortMonthMethod(monthNumber+1)    // используем собственный метод для получение сокращенного наименования следующего месяца  (в ячейке календаря отображается)

    let year  = getFullYear(date)       // используем стандартный метод для получения года
  

    // Переносим данные из локальных переменных в переменные из объекта data
    // День, месяц, год на календаре (могут отличаться от текущих при пролистывании календаря )  
    this.day = day
    this.month = month
    this.year  = year   

    //  Текущие  день, месяц, год на календаре
    this.currentDay = day
    this.currentMonth= month
    this.currentYear = year
   
    this.shortMonth = shortMonth  // короткое название текущего просматриваемого месяца
    this.nextShortMonth = nextShortMonth  // короткое название следующего просматриваемого месяца


  } 
  
}
</script>




<!-- Стили только для этого файла (scoped) -->

<style scoped lang="scss">



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
