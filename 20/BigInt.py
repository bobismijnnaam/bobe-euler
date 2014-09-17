class BigInt:
	def __init__(self):
		self.number = [0]
	
	def skim(self):
		carrier = 0

		for i in range(0, len(self.number)):
			self.number[i] += carrier
			head = self.number[i] % 10
			carrier = (self.number[i] - head) / 10
			self.number[i] = int(head)

		while carrier != 0:
			head = carrier % 10
			carrier = (carrier - head) / 10
			self.number.append(int(head)) 

	
	def add(self, factor):
		self.number[0] += factor
		
		self.skim();

	def mul(self, factor):
		for i in range(0, len(self.number)):
			self.number[i] *= factor

		self.skim()
	
	def getNumberArray(self):
		return list(self.number)
	
	def	toString(self):
		result = ""

		for i in self.number:
			result += str(i)

		return result

