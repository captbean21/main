<script src="https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js"></script>
  <script>
    window.addEventListener('DOMContentLoaded', async () => {
      // Check if Metamask is installed
      if (typeof web3 !== 'undefined') {
        // Use the current provider (Metamask)
        window.web3 = new Web3(web3.currentProvider);
      } else {
        // Prompt the user to install Metamask
        alert('Please install Metamask to use this feature!');
        return;
      }

      // Request access to the user's accounts
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error('Error requesting accounts access:', error);
        return;
      }

      // Set the provider to the Polygon network
      window.web3.eth.defaultChain = 'matic';

      // Get the user's accounts
      const accounts = await window.web3.eth.getAccounts();
      const account = accounts[0];

      // Display the user's address
      document.getElementById('account').textContent = 'Account: ' + account;

      // Staking functionality
      const tokenToStakeAddress = '0x182bC5baEaE5D06BcF4a909766BbdBDD2Cb4A8E9'; // Replace with the address of the token to stake
      const tokenToStakeABI = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint8","name":"decimals_","type":"uint8"},{"internalType":"uint256","name":"initialBalance_","type":"uint256"},{"internalType":"address payable","name":"feeReceiver_","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]; // Replace with the ABI of the token to stake

      const stakingContractAddress = '0xStakingContractAddress'; // Replace with the address of the staking contract
      const stakingContractABI = []; // Replace with the ABI of the staking contract

      const tokenToStakeContract = new window.web3.eth.Contract(tokenToStakeABI, tokenToStakeAddress);
      const stakingContract = new window.web3.eth.Contract(stakingContractABI, stakingContractAddress);

      // Event listener for the staking form submission
      document.getElementById('stakingForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const amountToStake = document.getElementById('amountToStake').value;

        // Perform the stake transaction
        try {
          await tokenToStakeContract.methods.approve(stakingContractAddress, amountToStake).send({ from: account });
          await stakingContract.methods.stake(amountToStake).send({ from: account });

          // Display success message or perform any other actions
          alert('Staking successful!');
        } catch (error) {
          console.error('Error staking:', error);
          // Display error message or handle the error accordingly
          alert('Staking failed. Please try again.');
        }
      });
    });
  </script>
